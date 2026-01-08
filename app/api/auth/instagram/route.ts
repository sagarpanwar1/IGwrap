import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ error: "No authorization code provided" }, { status: 400 })
    }

    const appId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID
    const appSecret = process.env.INSTAGRAM_APP_SECRET
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI

    if (!appId || !appSecret || !redirectUri) {
      console.error("[v0] Missing Instagram configuration")
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 })
    }

    const tokenResponse = await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: appId,
        client_secret: appSecret,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        code,
      }).toString(),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json()
      console.error("[v0] Token exchange error:", errorData)
      
      let errorMessage = "Failed to exchange code for token"
      if (errorData.error) {
        errorMessage = errorData.error
        if (errorData.error_description) {
          errorMessage += `: ${errorData.error_description}`
        }
      }
      
      return NextResponse.json({ error: errorMessage, details: errorData }, { status: 400 })
    }

    const tokenData = await tokenResponse.json()

    return NextResponse.json({
      accessToken: tokenData.access_token,
      userId: tokenData.user_id,
    })
  } catch (error) {
    console.error("[v0] Auth route error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
