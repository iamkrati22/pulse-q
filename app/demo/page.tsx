"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/toaster"
import { ArrowLeft, MessageSquare, BarChart3, Users, Monitor, Moon, Sun, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import FeedbackForm from "@/components/feedback-form"
import AdminDashboard from "@/components/admin-dashboard"

export default function DemoPage() {
  const [darkMode, setDarkMode] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 transition-all duration-500">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/")}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-gray-900 dark:text-white">PulseQ Demo</span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full w-10 h-10 p-0"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Demo Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Demo Header */}
        <div className="text-center mb-12">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mb-4">
            Interactive Demo
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Experience PulseQ
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">In Action</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Submit feedback as a user and watch it appear in real-time on the admin dashboard. Experience both sides of
            our powerful feedback processing system.
          </p>
        </div>

        {/* Demo Interface */}
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="split" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <TabsTrigger value="user" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                User View
              </TabsTrigger>
              <TabsTrigger value="split" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Split View
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Admin View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="user" className="mt-0">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    Submit Your Feedback
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-300">
                    Experience our intuitive feedback submission interface
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <FeedbackForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="split" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      User Interface
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <FeedbackForm />
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-white" />
                      </div>
                      Admin Dashboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 max-h-[600px] overflow-auto">
                    <AdminDashboard />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="admin" className="mt-0">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    Admin Dashboard
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-300">
                    Monitor and analyze feedback in real-time with advanced analytics
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <AdminDashboard />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Demo Instructions */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How to Use This Demo</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Submit Feedback</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Use the feedback form to submit sample feedback with different categories.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Watch Real-time Updates</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      See your feedback appear instantly in the admin dashboard with live processing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Explore Analytics</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Use filters, search, and view charts to understand the feedback analytics capabilities.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Toaster />
    </div>
  )
}
