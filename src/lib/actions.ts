/**
 * Contains server-side actions for the app
 * Should only be imported in server components or API routes.
 */

import { auth } from "@clerk/nextjs/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

/**
 * Retrieves API key for currently authenticated user.
 * If API key is not found, a new key is generated and saved to DynamoDB.
 *
 * @returns The user's API key
 * @throws {Error} if user is not authenticated or if DB error
 */
export async function getUserApiKey(): Promise<string | null> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated.");
  }

  if (
    !process.env.AWS_REGION ||
    !process.env.AWS_ACCESS_KEY_ID ||
    !process.env.AWS_SECRET_ACCESS_KEY ||
    !process.env.AWS_DYNAMO_TABLE
  ) {
    console.error(
      "AWS credentials or region not set as environment variables.",
    );
    throw new Error("Server configuration error: Missing AWS credentials.");
  }

  try {
    const command = new GetCommand({
      TableName: process.env.AWS_DYNAMO_TABLE,
      Key: { userId },
      ProjectionExpression: "apiKey", // GSI
    });

    const client = new DynamoDBClient();
    const { Item } = await client.send(command);
    return Item?.apiKey || null;
  } catch (error) {
    console.error("Error fetching API key:", error);
    throw new Error("Failed to retrieve API key.");
  }
}
