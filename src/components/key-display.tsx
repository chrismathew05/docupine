"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

import { EyeIcon, EyeOffIcon, Copy } from "lucide-react";

interface KeyDisplayProps {
  apiKey: string | null;
}

// Component to hide/reveal + copy api key
export default function KeyDisplay({ apiKey }: KeyDisplayProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Card className="p-4">
      <div className="flex justify-between">
        <p className="font-medium">{isVisible ? apiKey : "••••••••••••••••"}</p>

        <div className="flex gap-2">
          {/* API Key Visibility */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsVisible(!isVisible)}
                className="bg-black"
                variant="secondary"
                size="sm"
              >
                {isVisible ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle visibility</p>
            </TooltipContent>
          </Tooltip>

          {/* Copy to Clipboard */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  if (apiKey) {
                    navigator.clipboard.writeText(apiKey);
                    toast("API key copied to clipboard");
                  }
                }}
                className="bg-black"
                variant="secondary"
                size="sm"
                disabled={!apiKey}
              >
                <Copy size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to clipboard</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
}
