"use client"
import { SectionTransition } from "@/components/section-transition"

export function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 border-t border-white/5 glass">
      <div className="container max-w-5xl mx-auto">
        <SectionTransition transitionType="fade">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Nageshwar Kumar. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2 sm:mt-0">Final Year Student at IIT Jammu</p>
          </div>
        </SectionTransition>
      </div>
    </footer>
  )
}
