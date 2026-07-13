"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(2).max(150),
  message: z.string().min(10).max(3000),
  // honeypot - doit rester vide, rempli uniquement par les bots
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    subject: formData.get("subject")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
    company: formData.get("company")?.toString() ?? "",
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return { status: "error", message: "invalid" };
  }

  // Honeypot déclenché -> on répond succès sans rien envoyer (piège silencieux)
  if (parsed.data.company) {
    return { status: "success" };
  }

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL_TO ?? "japhetvaleureux@gmail.com",
      replyTo: parsed.data.email,
      subject: `[Portfolio] ${parsed.data.subject}`,
      text: `Nom: ${parsed.data.name}\nEmail: ${parsed.data.email}\n\n${parsed.data.message}`,
    });

    return { status: "success" };
  } catch (error) {
    console.error("sendContactEmail error:", error);
    return { status: "error", message: "server" };
  }
}