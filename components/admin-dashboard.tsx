"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Filter, Activity, TrendingUp, MessageSquare, Users, RefreshCw, Zap } from "lucide-react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Feedback {
  id: number
  name: string
  email: string
  category: string
  message: string
  timestamp: string
}

interface SystemLog {
  id: number
  message: string
  timestamp: string
  type: "info" | "success" | "warning"
}

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["complaint", "suggestion", "praise", "other"])
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const categories = [
    { value: "complaint", label: "Complaint", color: "#ef4444", emoji: "😞" },
    { value: "suggestion", label: "Suggestion", color: "#3b82f6", emoji: "💡" },
    { value: "praise", label: "Praise", color: "#10b981", emoji: "🎉" },
    { value: "other", label: "Other", color: "#6b7280", emoji: "💬" },
  ]

  // Initialize with sample data
  useEffect(() => {
    const sampleFeedbacks: Feedback[] = [
      {
        id: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
        category: "suggestion",
        message:
          "The interface could be more intuitive. Consider adding tooltips for new users to help them navigate better.",
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      },
      {
        id: 2,
        name: "Bob Smith",
        email: "bob@example.com",
        category: "praise",
        message: "Excellent service! The response time has improved significantly and the new features are amazing.",
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      },
      {
        id: 3,
        name: "Carol Davis",
        email: "carol@example.com",
        category: "complaint",
        message:
          "The system was down for 2 hours yesterday. This affected our productivity and we lost important data.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
    ]

    const sampleLogs: SystemLog[] = [
      {
        id: 1,
        message: "Feedback from Alice Johnson routed to Product Team",
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        type: "success",
      },
      {
        id: 2,
        message: "Kafka consumer processed 15 messages in the last minute",
        timestamp: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
        type: "info",
      },
      {
        id: 3,
        message: "High volume of complaints detected - alerting support team",
        timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        type: "warning",
      },
    ]

    setFeedbacks(sampleFeedbacks)
    setSystemLogs(sampleLogs)
  }, [])

  // Listen for new feedback from the form
  useEffect(() => {
    const handleNewFeedback = (event: CustomEvent) => {
      const newFeedback = event.detail as Feedback
      setFeedbacks((prev) => [newFeedback, ...prev])

      // Add system log
      const newLog: SystemLog = {
        id: Date.now(),
        message: `Feedback from ${newFeedback.name || "Anonymous"} routed to ${getCategoryService(newFeedback.category)}`,
        timestamp: new Date().toISOString(),
        type: "success",
      }
      setSystemLogs((prev) => [newLog, ...prev.slice(0, 9)])
    }

    window.addEventListener("newFeedback", handleNewFeedback as EventListener)
    return () => window.removeEventListener("newFeedback", handleNewFeedback as EventListener)
  }, [])

  // Filter feedbacks based on search and categories
  useEffect(() => {
    let filtered = feedbacks.filter((feedback) => selectedCategories.includes(feedback.category))

    if (searchTerm) {
      filtered = filtered.filter(
        (feedback) =>
          feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          feedback.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredFeedbacks(filtered)
  }, [feedbacks, searchTerm, selectedCategories])

  const getCategoryService = (category: string) => {
    const services = {
      complaint: "Support Service",
      suggestion: "Product Team",
      praise: "Management",
      other: "General Queue",
    }
    return services[category as keyof typeof services] || "General Queue"
  }

  const getCategoryColor = (category: string) => {
    const categoryObj = categories.find((cat) => cat.value === category)
    return categoryObj?.color || "#6b7280"
  }

  const getCategoryEmoji = (category: string) => {
    const categoryObj = categories.find((cat) => cat.value === category)
    return categoryObj?.emoji || "💬"
  }

  const getCategoryStats = () => {
    const stats = categories.map((category) => ({
      name: category.label,
      value: feedbacks.filter((f) => f.category === category.value).length,
      color: category.color,
    }))
    return stats
  }

  const getHourlyStats = () => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 1)
    return hours.map((hour) => ({
      hour: `${hour}:00`,
      count: Math.floor(Math.random() * 15) + 5,
    }))
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const getLogTypeColor = (type: string) => {
    const colors = {
      info: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
      success: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
    }
    return colors[type as keyof typeof colors] || colors.info
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Feedback</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{feedbacks.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Active Users</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {feedbacks.filter((f) => f.name).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Response Rate</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">94%</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">System Status</p>
                <p className="text-sm font-bold text-green-600 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Online
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Feedback Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={getCategoryStats()}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {getCategoryStats().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              Hourly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={getHourlyStats()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-purple-600" />
              Feedback Management
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 bg-transparent"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name, email, or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 bg-white/50 dark:bg-gray-800/50"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Label className="text-sm font-medium">Filter by category:</Label>
            {categories.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <Checkbox
                  id={category.value}
                  checked={selectedCategories.includes(category.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategories((prev) => [...prev, category.value])
                    } else {
                      setSelectedCategories((prev) => prev.filter((cat) => cat !== category.value))
                    }
                  }}
                />
                <Label htmlFor={category.value} className="text-sm flex items-center gap-2">
                  <span>{category.emoji}</span>
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feedback Table */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Recent Feedback ({filteredFeedbacks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {filteredFeedbacks.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No feedback matches your current filters</p>
                </div>
              ) : (
                filteredFeedbacks.map((feedback, index) => (
                  <div
                    key={feedback.id}
                    className={`p-6 border border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-300 hover:shadow-lg ${
                      index === 0
                        ? "animate-in slide-in-from-top-2 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 border-blue-200 dark:border-blue-700"
                        : "bg-white/50 dark:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {feedback.name ? feedback.name.charAt(0).toUpperCase() : "A"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{feedback.name || "Anonymous"}</p>
                          {feedback.email && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">{feedback.email}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                          style={{
                            backgroundColor: `${getCategoryColor(feedback.category)}20`,
                            color: getCategoryColor(feedback.category),
                          }}
                        >
                          <span>{getCategoryEmoji(feedback.category)}</span>
                          {categories.find((cat) => cat.value === feedback.category)?.label}
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTime(feedback.timestamp)}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      {feedback.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* System Logs */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            Live System Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            <div className="space-y-2">
              {systemLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Badge className={getLogTypeColor(log.type)}>{log.type.toUpperCase()}</Badge>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{log.message}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(log.timestamp)}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
