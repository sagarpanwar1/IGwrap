"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { InstagramDataFetcher } from "@/components/instagram-data-fetcher"

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      const code = searchParams.get("code")
      const errorParam = searchParams.get("error")
      const errorReason = searchParams.get("error_reason")
      const errorDescription = searchParams.get("error_description")

      if (errorParam) {
        let errorMessage = `Authorization failed: ${errorParam}`
        
        // Provide helpful messages for common errors
        if (errorParam === "access_denied") {
          errorMessage = "You denied access to the app. Please try again and grant the necessary permissions."
        } else if (errorReason === "user_denied") {
          errorMessage = "You cancelled the authorization. Please try again."
        } else if (errorDescription) {
          errorMessage = `Authorization failed: ${errorDescription}`
        }
        
        // Special handling for "Invalid platform app" error
        if (errorDescription?.includes("Invalid platform app") || errorDescription?.includes("Invalid Request")) {
          errorMessage = `Instagram App Configuration Error: ${errorDescription}\n\n` +
            `This usually means:\n` +
            `1. Your Instagram app in Meta Developer Console is not configured for "Instagram Basic Display"\n` +
            `2. The redirect URI doesn't match what's configured in your app settings\n` +
            `3. Make sure your redirect URI in Meta Developer Console matches: ${window.location.origin}/auth/callback`
        }
        
        setError(errorMessage)
        setIsLoading(false)
        return
      }

      if (!code) {
        setError("No authorization code received. Make sure you completed the Instagram login process.")
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch("/api/auth/instagram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Token exchange failed")
        }

        const data = await response.json()
        setAccessToken(data.accessToken)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    exchangeCodeForToken()
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Connecting to Instagram...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4">
        <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops!</h2>
          <div className="text-gray-700 mb-6 text-left">
            <p className="whitespace-pre-line mb-4">{error}</p>
            {error.includes("Invalid platform app") && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4 text-sm">
                <p className="font-semibold text-yellow-800 mb-2">How to fix:</p>
                <ol className="list-decimal list-inside space-y-1 text-yellow-700">
                  <li>Go to <a href="https://developers.facebook.com/apps" target="_blank" rel="noopener noreferrer" className="underline">Meta Developer Console</a></li>
                  <li>Select your Instagram app</li>
                  <li>Go to "Basic Display" settings</li>
                  <li>Add this redirect URI: <code className="bg-yellow-100 px-1 rounded">{typeof window !== 'undefined' ? window.location.origin + '/auth/callback' : '/auth/callback'}</code></li>
                  <li>Make sure your app is set up as "Instagram Basic Display" (not Facebook Login)</li>
                </ol>
              </div>
            )}
          </div>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (accessToken) {
    return <InstagramDataFetcher accessToken={accessToken} />
  }

  return null
}
