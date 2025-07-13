import type React from "react"
import type { Metadata } from "next"
import { Roboto_Mono } from "next/font/google"
import "./globals.css"

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
})

export const metadata: Metadata = {
  title: "My Albums",
  description: "Personal album collection",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${robotoMono.variable} font-mono antialiased`}>{children}</body>
    </html>
  )
}
