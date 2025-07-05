"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Sparkles, Play, ChevronRight, MessageSquare, BarChart3, Shield } from "lucide-react"

interface HeroSectionProps {
  onGoToDemo: () => void
}

export default function HeroSection({ onGoToDemo }: HeroSectionProps) {
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    { icon: MessageSquare, text: "Real-time Feedback Processing", color: "text-blue-500" },
    { icon: BarChart3, text: "Advanced Analytics Dashboard", color: "text-green-500" },
    { icon: Shield, text: "Kafka-powered Reliability", color: "text-purple-500" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        {/* Status Badge */}
        <div className="mb-8 animate-fade-in">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 px-4 py-2 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by Apache Kafka & Microservices
          </Badge>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up delay-200">
          <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            Transform Feedback
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Into Insights
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-400">
          PulseQ revolutionizes how organizations collect, process, and analyze feedback in real-time using cutting-edge
          microservice architecture and Apache Kafka streaming.
        </p>

        {/* Rotating Features */}
        <div className="mb-12 animate-fade-in-up delay-600">
          <div className="flex items-center justify-center gap-3 text-lg font-medium">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              {(() => {
                const CurrentIcon = features[currentFeature].icon
                return (
                  <CurrentIcon className={`w-6 h-6 ${features[currentFeature].color} transition-all duration-500`} />
                )
              })()}
              <span className="transition-all duration-500">{features[currentFeature].text}</span>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {features.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentFeature ? "bg-blue-500 w-8" : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-800">
          <Button
            onClick={onGoToDemo}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Play className="w-5 h-5 mr-2" />
            Try Live Demo
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 px-8 py-4 text-lg font-medium rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
          >
            Learn More
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce">
          <ArrowDown className="w-6 h-6 text-gray-400 mx-auto" />
        </div>
      </div>
    </section>
  )
}
