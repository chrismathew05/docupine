import KeyDisplay from "@/components/key-display";
import RegenKey from "@/components/regen-key";
import { getUserApiKey, createUserApiKey } from "@/lib/actions";

// Developer page to display/regenerate API key
export default async function Developer() {
  const apiKey = await getUserApiKey();

  return (
    <div className="space-y-4">
      <h1>API Key</h1>
      <p>
        An API key can be used to access the Docupine API. See the{" "}
        <a
          href="https://google.ca"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          docs
        </a>{" "}
        for more information.
      </p>

      <KeyDisplay apiKey={apiKey} />
      <RegenKey createUserApiKeyAction={createUserApiKey} />
    </div>
  );
}
