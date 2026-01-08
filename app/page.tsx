"use client"

import { useState, useEffect, Suspense } from "react"
import { InstagramLogin } from "@/components/instagram-login"
import { useSearchParams } from "next/navigation"

function HomeContent() {
  const [showLogin, setShowLogin] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get("code")
    if (code) {
      setShowLogin(false)
    }
  }, [searchParams])

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      {showLogin ? <InstagramLogin /> : null}
    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    }>
      <HomeContent />
    </Suspense>
  )
}
