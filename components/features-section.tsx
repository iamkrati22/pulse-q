"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, BarChart3, Shield, Globe, MessageSquare, Layers, TrendingUp, Bell, Filter, Database } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Real-time Processing",
      description:
        "Process thousands of feedback messages per second with Apache Kafka's high-throughput streaming platform.",
      color: "from-yellow-400 to-orange-500",
      badge: "Performance",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Gain deep insights with interactive dashboards, trend analysis, and predictive feedback patterns.",
      color: "from-green-400 to-blue-500",
      badge: "Intelligence",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption, role-based access control, and audit trails.",
      color: "from-purple-400 to-pink-500",
      badge: "Security",
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Horizontally scalable microservices architecture that grows with your organization's needs.",
      color: "from-blue-400 to-indigo-500",
      badge: "Scalability",
    },
    {
      icon: MessageSquare,
      title: "Smart Categorization",
      description: "AI-powered automatic categorization and sentiment analysis of incoming feedback.",
      color: "from-teal-400 to-green-500",
      badge: "AI/ML",
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description: "Real-time alerts and notifications for critical feedback that requires immediate attention.",
      color: "from-red-400 to-pink-500",
      badge: "Alerts",
    },
  ]

  const techStack = [
    { name: "Apache Kafka", icon: Database },
    { name: "Microservices", icon: Layers },
    { name: "Real-time Analytics", icon: TrendingUp },
    { name: "Advanced Filtering", icon: Filter },
  ]

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-4">
            Why Choose PulseQ
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Built for the Future of
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Feedback Management
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of feedback processing with enterprise-grade reliability, real-time insights,
            and seamless scalability.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:scale-105"
            >
              <CardContent className="p-8">
                <div className="mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="mb-3">
                    {feature.badge}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
            Powered by Industry-Leading Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <tech.icon className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900 dark:text-white">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
