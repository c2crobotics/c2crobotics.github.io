import { z } from "zod"

export const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(50, { message: "First name must not exceed 50 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." })
    .max(50, { message: "Last name must not exceed 50 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required." })
    .regex(/^\+?[0-9]+$/, {
      message:
        "Phone number must contain only numbers.",
    })
    .min(10, { message: "Phone number must be at least 10 digits." })
    .max(15, { message: "Phone number must not exceed 15 digits." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  "h-captcha-response": z.string().min(1, "Please complete the captcha verification"),
  website: z.string().max(0, "Unexpected error"),
})
