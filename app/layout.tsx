import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PulseQ - Real-time Feedback Processing System",
  description:
    "Transform feedback into insights with our cutting-edge microservice architecture powered by Apache Kafka. Experience real-time processing, advanced analytics, and enterprise-grade reliability.",
  keywords: ["feedback", "real-time", "kafka", "microservices", "analytics", "dashboard"],
  authors: [{ name: "PulseQ Team" }],
  openGraph: {
    title: "PulseQ - Real-time Feedback Processing System",
    description: "Transform feedback into insights with cutting-edge technology",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
