"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Send, User, Mail, Tag, MessageCircle, Loader2, Sparkles } from "lucide-react"

interface FeedbackData {
  name: string
  email: string
  category: string
  message: string
}

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackData>({
    name: "",
    email: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FeedbackData>>({})
  const { toast } = useToast()

  const categories = [
    { value: "complaint", label: "Complaint", color: "text-red-600", emoji: "😞" },
    { value: "suggestion", label: "Suggestion", color: "text-blue-600", emoji: "💡" },
    { value: "praise", label: "Praise", color: "text-green-600", emoji: "🎉" },
    { value: "other", label: "Other", color: "text-gray-600", emoji: "💬" },
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<FeedbackData> = {}

    if (!formData.category) {
      newErrors.category = "Please select a category"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Connect to our backend feedback API
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          category: formData.category,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      toast({
        title: "Feedback Submitted Successfully! 🎉",
        description: "Thank you for your feedback. We'll review it shortly.",
        className: "bg-gradient-to-r from-green-50 to-blue-50 border-green-200 text-green-800",
      })

      // Reset form
      setFormData({ name: "", email: "", category: "", message: "" })
      setErrors({})

      // Dispatch event for real-time updates
      const event = new CustomEvent("newFeedback", {
        detail: {
          ...formData,
          id: Date.now(),
          timestamp: new Date().toISOString(),
        },
      })
      window.dispatchEvent(event)
    } catch (error) {
      console.error('Feedback submission error:', error)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your feedback. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FeedbackData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <User className="w-4 h-4 text-blue-500" />
                Name (Optional)
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-12 bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <Mail className="w-4 h-4 text-blue-500" />
                Email (Optional)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`h-12 bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 ${
                  errors.email ? "border-red-500 focus:border-red-500" : ""
                }`}
              />
              {errors.email && <p className="text-sm text-red-600 flex items-center gap-1">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="category"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <Tag className="w-4 h-4 text-blue-500" />
              Category *
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger
                className={`h-12 bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 ${errors.category ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Select feedback category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center gap-2">
                      <span>{category.emoji}</span>
                      <span className={category.color}>{category.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="message"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <MessageCircle className="w-4 h-4 text-blue-500" />
              Message *
            </Label>
            <Textarea
              id="message"
              placeholder="Share your feedback, suggestions, or concerns..."
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              rows={5}
              className={`bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 resize-none ${
                errors.message ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
            <div className="flex justify-between items-center">
              {errors.message && <p className="text-sm text-red-600">{errors.message}</p>}
              <p className="text-sm text-gray-500 ml-auto">{formData.message.length}/500</p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Submit Feedback
                <Sparkles className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
