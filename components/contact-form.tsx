"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState, useRef } from "react"
import type { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { formSchema } from "@/lib/schemas"
import HCaptcha from "@hcaptcha/react-hcaptcha"

const HCAPTCHA_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submittingRef = useRef(false)
  const { toast } = useToast()
  const captchaRef = useRef<HCaptcha>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      "h-captcha-response": "",
      website: "",
    },
  })

  const onHCaptchaChange = (token: string) => {
    form.setValue("h-captcha-response", token)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.website) {
      toast({
        title: "Message sent successfully!",
        description: `Thank you ${values.firstName}! We'll get back to you soon.`,
      })
      form.reset()
      captchaRef.current?.resetCaptcha()
      return
    }

    if (submittingRef.current) return
    submittingRef.current = true
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("access_key", "ee19ce46-f6f7-4e65-9637-e5b01307f769")
      formData.append("subject", "Contact Form Submission")
      formData.append("first_name", values.firstName)
      formData.append("last_name", values.lastName)
      formData.append("email", values.email)
      formData.append("phone", values.phone)
      formData.append("message", values.message)
      formData.append("h-captcha-response", values["h-captcha-response"])

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: `Thank you ${values.firstName}! We'll get back to you soon.`,
        })
        form.reset()
        captchaRef.current?.resetCaptcha()
      } else {
        const errorData = await response.json().catch(() => null)
        toast({
          title: "Submission failed",
          description: errorData?.message || "Please check your input and try again.",
          variant: "destructive",
        })
        captchaRef.current?.resetCaptcha()
        form.setValue("h-captcha-response", "", { shouldValidate: false })
      }
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      })
      console.error("Form submission error:", error)
      captchaRef.current?.resetCaptcha()
      form.setValue("h-captcha-response", "", { shouldValidate: false })
    } finally {
      setIsSubmitting(false)
      submittingRef.current = false
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="hidden">Website</FormLabel>
                  <FormControl>
                    <Input tabIndex={-1} autoComplete="off" placeholder="leave empty" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please provide as much detail as possible..."
                    className="min-h-32 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <HCaptcha
              ref={captchaRef}
              sitekey={HCAPTCHA_SITEKEY}
              reCaptchaCompat={false}
              onVerify={onHCaptchaChange}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>
    </div>
  )
}