import twilio from 'twilio';

function getTwilioClient() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) return null;
  return twilio(sid, token);
}

export async function sendSms(to: string, from: string, body: string): Promise<boolean> {
  const client = getTwilioClient();
  if (!client) return false;

  try {
    await client.messages.create({ to, from, body });
    return true;
  } catch (_) {
    return false;
  }
}
