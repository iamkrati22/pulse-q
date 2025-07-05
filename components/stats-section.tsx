"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, MessageSquare, Zap, Globe, Clock } from "lucide-react"

export default function StatsSection() {
  const [counters, setCounters] = useState({
    feedback: 0,
    users: 0,
    uptime: 0,
    countries: 0,
  })

  const finalStats = {
    feedback: 1250000,
    users: 45000,
    uptime: 99.9,
    countries: 120,
  }

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    const intervals = Object.keys(finalStats).map((key) => {
      const finalValue = finalStats[key as keyof typeof finalStats]
      const increment = finalValue / steps

      return setInterval(() => {
        setCounters((prev) => ({
          ...prev,
          [key]: Math.min(prev[key as keyof typeof prev] + increment, finalValue),
        }))
      }, stepDuration)
    })

    setTimeout(() => {
      intervals.forEach(clearInterval)
      setCounters(finalStats)
    }, duration)

    return () => intervals.forEach(clearInterval)
  }, [])

  const stats = [
    {
      icon: MessageSquare,
      label: "Feedback Processed",
      value: Math.floor(counters.feedback).toLocaleString(),
      suffix: "+",
      color: "from-blue-500 to-cyan-500",
      description: "Messages processed through our Kafka pipeline",
    },
    {
      icon: Users,
      label: "Active Users",
      value: Math.floor(counters.users).toLocaleString(),
      suffix: "+",
      color: "from-green-500 to-emerald-500",
      description: "Organizations trust PulseQ worldwide",
    },
    {
      icon: TrendingUp,
      label: "Uptime",
      value: counters.uptime.toFixed(1),
      suffix: "%",
      color: "from-purple-500 to-pink-500",
      description: "Enterprise-grade reliability guaranteed",
    },
    {
      icon: Globe,
      label: "Countries",
      value: Math.floor(counters.countries).toString(),
      suffix: "+",
      color: "from-orange-500 to-red-500",
      description: "Global reach across all continents",
    },
  ]

  const achievements = [
    { icon: Zap, text: "Lightning Fast Processing", subtext: "< 10ms response time" },
    { icon: Clock, text: "24/7 Monitoring", subtext: "Round-the-clock support" },
    { icon: TrendingUp, text: "99.9% Uptime", subtext: "Enterprise reliability" },
  ]

  return (
    <section id="stats" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 mb-4">
            Trusted Globally
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Numbers That
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Speak Volumes
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of organizations worldwide who trust PulseQ to transform their feedback processes.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-105"
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${stat.color} p-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{stat.label}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Why Industry Leaders Choose PulseQ</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900 dark:text-white">{achievement.text}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{achievement.subtext}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
