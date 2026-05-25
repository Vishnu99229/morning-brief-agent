import axios from "axios";
import "dotenv/config";

export async function triggerRoastCall(
  name: string,
  phone: string,
  roastScript: string
): Promise<string> {
  const assistantId = process.env.VAPI_ROAST_ASSISTANT_ID;
  if (!assistantId) {
    throw new Error("Missing VAPI_ROAST_ASSISTANT_ID in environment variables.");
  }

  const response = await axios.post(
    "https://api.vapi.ai/call/phone",
    {
      phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID,
      assistantId,
      customer: {
        number: phone,
        name,
      },
      assistantOverrides: {
        variableValues: {
          name,
          roast_script: roastScript,
        },
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 15000,
    }
  );

  const callId = response.data?.id;
  if (!callId) {
    throw new Error("Vapi call response did not include a call ID.");
  }

  return callId;
}
