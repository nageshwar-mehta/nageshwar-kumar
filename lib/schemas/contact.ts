import { z } from "zod"

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(5, "Message must be at least 5 characters"),
  userAgent: z.string().optional(),
})

export type ContactFormValues = z.infer<typeof ContactFormSchema>