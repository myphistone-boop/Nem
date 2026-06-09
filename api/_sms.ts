import twilio from 'twilio';

function getTwilioClient() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) return null;
  return twilio(sid, token);
}

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/[\s\-().]/g, '');
  if (digits.startsWith('+')) return digits;
  if (digits.startsWith('00')) return '+' + digits.slice(2);
  if (digits.startsWith('0')) return '+33' + digits.slice(1);
  return '+33' + digits;
}

export async function sendSms(to: string, from: string, body: string): Promise<boolean> {
  const client = getTwilioClient();
  if (!client) return false;

  try {
    await client.messages.create({ to: normalizePhone(to), from, body });
    return true;
  } catch (_) {
    return false;
  }
}
