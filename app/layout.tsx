import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { AdvancedLoadingScreen } from "@/components/advanced-loading-screen"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Nageshwar Kumar | IoT & ML Engineer",
  description:
    "Portfolio of Nageshwar Kumar, specializing in IoT, Machine Learning, and hardware-software integrations."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <AdvancedLoadingScreen />
          <div className="flex min-h-screen bg-black relative noise">
            <Sidebar />
            <main className="flex-1 ml-16 md:ml-20 overflow-x-hidden">
              <div className="relative">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
