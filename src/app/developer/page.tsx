"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, TrashIcon } from "lucide-react";

export default function Developer() {
  const [apiKey, setApiKey] = useState("abcxyz");
  const [showApiKey, setShowApiKey] = useState(false);

  const handleGenerateApiKey = () => {
    setApiKey("550e8400-e29b-41d4-a716-446655440000");
  };

  const handleDeleteApiKey = () => {
    setApiKey("");
  };

  return (
    <div className="space-y-4">
      <h1>API Key</h1>
      <p>
        An API key can be used to access the Docupine API. See the{" "}
        <a
          href="google.ca"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          docs
        </a>{" "}
        for more information.
      </p>

      <Card className="p-4">
        <div className="flex justify-between">
          <p className="font-medium">
            {showApiKey ? apiKey : "••••••••••••••••"}
          </p>
          <div className="flex gap-2">
            <Button
              className="bg-black"
              variant="secondary"
              size="sm"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? (
                <EyeOffIcon className="h-4 w-4 mr-1" />
              ) : (
                <EyeIcon className="h-4 w-4 mr-1" />
              )}
              {showApiKey ? "Hide" : "Reveal"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteApiKey}
            >
              <TrashIcon className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
