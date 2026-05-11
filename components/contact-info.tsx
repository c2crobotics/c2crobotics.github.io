"use client"

import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

const locations = [
  {
    id: "bayside",
    name: "Bayside",
    title: "Bayside Location",
    address: ["41-08 Bell Blvd,", "2nd Floor,", "Bayside, NY 11361"],
    phone: "646-799-3980",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.9357096486146!2d-73.77379912358445!3d40.763438734464316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c261e0098d476b%3A0xa98f367477ddbd08!2s41-02%20Bell%20Blvd%202nd%20Floor%2C%20Bayside%2C%20NY%2011361!5e0!3m2!1sen!2sus!4v1751746580649!5m2!1sen!2sus",
  },
  {
    id: "mineola",
    name: "Mineola",
    title: "Mineola Location",
    address: ["254 E Jericho Turnpike", "Mineola, NY 11501"],
    phone: "516-899-8886",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.5!2d-73.64!3d40.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s254%20E%20Jericho%20Turnpike%2C%20Mineola%2C%20NY%2011501!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
  },
]

const hoursOfOperation = [
  { day: "Monday", hours: "Closed" },
  { day: "Tuesday", hours: "6:00 pm – 8:00 pm" },
  { day: "Wednesday", hours: "6:00 pm – 8:00 pm" },
  { day: "Thursday", hours: "1:00 pm – 8:00 pm" },
  { day: "Friday", hours: "10:00 am – 9:00 pm" },
  { day: "Saturday", hours: "10:00 am – 8:00 pm" },
  { day: "Sunday", hours: "10:00 am – 7:00 pm" },
]

export default function ContactInfo() {
  const [isInView, setIsInView] = useState(false)
  const [activeTab, setActiveTab] = useState("bayside")
  const [isTabAnimating, setIsTabAnimating] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const handleTabChange = (value: string) => {
    setIsTabAnimating(true)
    setTimeout(() => {
      setActiveTab(value)
      setTimeout(() => setIsTabAnimating(false), 50)
    }, 200)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className={`text-3xl font-bold text-center mb-8 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>Our Offices</h2>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className={`w-full justify-center gap-8 bg-transparent mb-2 transition-all duration-700 delay-100 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
            {locations.map((location) => (
              <TabsTrigger
                key={location.id}
                value={location.id}
                className="px-6 py-2 text-base font-medium text-muted-foreground data-[state=active]:text-destructive data-[state=active]:border-b-2 data-[state=active]:border-destructive data-[state=active]:bg-transparent rounded-none bg-transparent hover:text-foreground transition-all duration-300 hover:scale-105"
              >
                {location.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="border-t border-border mb-8" />

          {locations.map((location) => (
            <TabsContent key={location.id} value={location.id} className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Location Details */}
                <div className={`space-y-6 transition-all duration-500 ${isInView ? (isTabAnimating ? "opacity-0 -translate-x-4" : "opacity-100 translate-x-0") : "opacity-0 -translate-x-8"}`}>
                  <h3 className="text-2xl font-bold text-foreground">{location.title}</h3>

                  <div className="space-y-4">
                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                      <div className="text-foreground">
                        {location.address.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-green-600 shrink-0" />
                      <a
                        href={`tel:${location.phone.replace(/[^0-9+]/g, "")}`}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {location.phone}
                      </a>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-blue-600 shrink-0" />
                      <a
                        href="mailto:info@c2crobotics.com"
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        info@c2crobotics.com
                      </a>
                    </div>
                  </div>

                  {/* QR Codes */}
                  <div className="flex gap-6 mt-6">
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-border shadow-sm bg-white p-1 transition-transform duration-300 hover:scale-105 hover:shadow-md">
                      <Image
                        src="/scanWeChat.jpg"
                        alt="WeChat QR Code"
                        fill
                        sizes="128px"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Hours of Operation */}
                  <Card className="mt-6 transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Clock className="h-5 w-5 text-orange-600" />
                        Hours of Operation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {hoursOfOperation.map((schedule, index) => (
                          <div key={index} className="flex justify-between items-center py-1">
                            <span className="font-medium text-foreground">{schedule.day}</span>
                            <span
                              className={`text-sm ${schedule.hours === "Closed"
                                ? "text-destructive"
                                : "text-muted-foreground"
                                }`}
                            >
                              {schedule.hours}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Google Maps */}
                <div className={`w-full h-125 rounded-lg overflow-hidden shadow-lg transition-all duration-500 delay-100 ${isInView ? (isTabAnimating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0") : "opacity-0 translate-x-8"}`}>
                  <iframe
                    src={location.mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${location.name} Location Map`}
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
