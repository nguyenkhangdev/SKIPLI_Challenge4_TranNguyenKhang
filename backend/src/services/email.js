import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);

export default async function sendEmail(toEmail, accessCode) {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev", //import from env
      to: toEmail,
      subject: "OTP - SKIPLI - Trần Nguyên Khang",
      html: `<p>Your test OTP <strong>${accessCode}</strong></p>`,
    });
  } catch (error) {
    throw new Error(error);
  }
}
