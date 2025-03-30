
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CLAUDE_API_KEY = Deno.env.get("CLAUDE_API_KEY");
const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userMessage, messageHistory } = await req.json();
    
    // Transform the history into Claude's format
    const messages = messageHistory.map(msg => ({
      role: msg.isAi ? "assistant" : "user",
      content: msg.text
    }));
    
    // Add the new user message
    messages.push({
      role: "user",
      content: userMessage
    });

    // System prompt for legal assistant
    const systemPrompt = "You are Lawroom AI, a helpful legal research assistant specialized in Indian law. Provide accurate, clear, and concise information about Indian legal concepts, cases, and statutes. When answering questions, cite relevant laws and precedents. If you don't know the answer, say so instead of making up information.";

    const response = await fetch(CLAUDE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        system: systemPrompt,
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Claude API error:", errorData);
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify({ 
      message: data.content[0].text 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in legal-ai-chat function:", error);
    return new Response(JSON.stringify({ 
      error: error.message || "An error occurred while processing your request" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
