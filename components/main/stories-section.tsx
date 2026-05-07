import { siteConfig } from "@/config/site"
import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const testimonials = [
  {
    name: "test1",
    role: "Student",
    program: "Competition Team",
    image: "/gallery/placeholder.webp?height=300&width=300&text=jane+doe",
    rating: 5,
    quote:
      "test",
    highlight: "test",
  },
  {
    name: "test2",
    role: "test",
    program: "Competition Team",
    image: "/gallery/placeholder.webp?height=300&width=300&text=jane+doe",
    rating: 5,
    quote:
      "test",
    highlight: "test",
  },
]

export default function StoriesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Student Testimonials
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear directly from our students about how Coast 2 Coast Robotics has
            transformed their learning journey and opened doors to incredible
            opportunities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden h-full border border-gray-100">
                {/* Header  */}
                <div className="p-6 pb-4">
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {testimonial.program}
                        </span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {testimonial.highlight}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Star rating */}
                  <div className="flex items-center gap-1 mt-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Testimonial content */}
                <div className="px-6 pb-6">
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <Quote className="w-5 h-5 text-gray-400 mb-2" />
                    <p className="text-gray-700 italic mb-2">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
              Join hundreds of students who have discovered their passion for
              robotics and engineering at Coast 2 Coast Robotics.
            </p>
            <Link href={siteConfig.siteURLs.courses}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg transition-colors duration-200">
                Explore Programs
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}