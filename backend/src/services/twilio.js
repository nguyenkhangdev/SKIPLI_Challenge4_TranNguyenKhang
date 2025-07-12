// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from "twilio";
import "dotenv/config";
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function sendSMSAccessCode(phoneNumber, accessCode) {
  const message = await client.messages.create({
    body: `OTP: ${accessCode}
    Valid for 3 minutes.
    SKIPLI - nguyenkhangdev@gmail.com`,
    from: process.env.TWILIO_SENDER_NUMBER,
    to: phoneNumber,
  });
}
