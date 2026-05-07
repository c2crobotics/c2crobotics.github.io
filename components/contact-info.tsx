import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card"

export default function ContactInfo() {
  const hoursOfOperation = [
    { day: "Monday", hours: "Closed" },
    { day: "Tuesday", hours: "6:00 pm – 8:00 pm" },
    { day: "Wednesday", hours: "6:00 pm – 8:00 pm" },
    { day: "Thursday", hours: "1:00 pm – 8:00 pm" },
    { day: "Friday", hours: "10:00 am – 9:00 pm" },
    { day: "Saturday", hours: "10:00 am – 8:00 pm" },
    { day: "Sunday", hours: "10:00 am – 7:00 pm" },
  ]

  return (
    <section className="mt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Visit Our Office</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Google Maps */}
          <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.9357096486146!2d-73.77379912358445!3d40.763438734464316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c261e0098d476b%3A0xa98f367477ddbd08!2s41-02%20Bell%20Blvd%202nd%20Floor%2C%20Bayside%2C%20NY%2011361!5e0!3m2!1sen!2sus!4v1751746580649!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="C2C Robotics Office Location"
            />
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  41-08 Bell Blvd
                  <br />
                  2nd Floor
                  <br />
                  Bayside, NY 11361
                </p>
              </CardContent>
            </Card>

            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-green-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <a href="tel:646-799-3980" className="text-blue-600 hover:text-blue-800 transition-colors">
                    646-799-3980
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a href="mailto:info@c2crobotics.com" className="text-blue-600 hover:text-blue-800 transition-colors">
                    info@c2crobotics.com
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Hours of Operation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  Hours of Operation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {hoursOfOperation.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{schedule.day}</span>
                      <span
                        className={`text-sm ${schedule.hours === "Closed"
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-600 dark:text-gray-400"
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
        </div>
      </div>
    </section>
  )
}