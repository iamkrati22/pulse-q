"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, BarChart3, Users, Monitor, Play, Pause } from "lucide-react"
import FeedbackForm from "@/components/feedback-form"
import AdminDashboard from "@/components/admin-dashboard"

export default function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section id="demo" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mb-4">
            Interactive Experience
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              See PulseQ in
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Action</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Experience both sides of the platform - submit feedback as a user and monitor it in real-time as an
            administrator.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
            >
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? "Pause Demo" : "Start Live Demo"}
            </Button>
          </div>
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
      </div>
    </section>
  )
}
