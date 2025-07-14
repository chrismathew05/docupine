"use server";

/**
 * Contains server-side actions for the app
 * Should only be imported in server components or API routes.
 */

import { auth } from "@clerk/nextjs/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { revalidatePath } from "next/cache";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

/**
 * Retrieves API key for currently authenticated user.
 * If API key is not found, a new key is generated and saved to DynamoDB.
 *
 * @returns The user's API key
 * @throws {Error} if user is not authenticated or AWS/DB error
 */
export async function getUserApiKey(): Promise<string | null> {
  const userId = await checkAuth();

  try {
    const command = new GetCommand({
      TableName: process.env.AWS_DYNAMO_TABLE,
      Key: { userId },
      ProjectionExpression: "apiKey", // GSI
    });

    const { Item } = await docClient.send(command);
    return Item?.apiKey ?? createUserApiKey();
  } catch (error) {
    console.error("Error fetching API key:", error);
    throw new Error("Failed to retrieve API key.");
  }
}

/**
 * Creates/updates API key in Dynamo table for currently authenticated user.
 *
 * @returns Newly created API key
 * @throws {Error} if user is not authenticated or AWS/DB error
 */
export async function createUserApiKey(): Promise<string | null> {
  const userId = await checkAuth();

  const apiKey = crypto.randomUUID();

  const command = new PutCommand({
    TableName: process.env.AWS_DYNAMO_TABLE,
    Item: {
      userId: userId,
      apiKey: apiKey,
    },
  });

  try {
    await docClient.send(command);
  } catch (error) {
    console.error("Error creating API key:", error);
    throw new Error("Failed to create API key.");
  }

  revalidatePath("/developer");

  return apiKey;
}

// HELPERS

/**
 * Ensures user is authenticated via Clerky
 *
 * @returns Clerky user ID if authenticated
 * @throws {Error} if user is not authenticated
 */
async function checkAuth(): Promise<string | null> {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated.");

  return userId;
}
