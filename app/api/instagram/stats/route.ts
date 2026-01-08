import { type NextRequest, NextResponse } from "next/server"

interface IGMedia {
  id: string
  caption?: string
  media_type: string
  timestamp: string
  like_count: number
  comments_count: number
  media_url?: string
}

interface IGUser {
  id: string
  username: string
  name: string
  biography: string
  profile_picture_url: string
  followers_count: number
  follows_count: number
  media_count: number
}

export async function POST(request: NextRequest) {
  try {
    const { accessToken } = await request.json()

    if (!accessToken) {
      return NextResponse.json({ error: "No access token provided" }, { status: 400 })
    }

    const userResponse = await fetch(
      `https://graph.instagram.com/v18.0/me?fields=id,username,name,biography,profile_picture_url,followers_count,follows_count,media_count&access_token=${accessToken}`,
    )

    if (!userResponse.ok) {
      console.error("[v0] Failed to fetch user data")
      return NextResponse.json({ error: "Failed to fetch Instagram profile" }, { status: 400 })
    }

    const userData: IGUser = await userResponse.json()

    const mediaResponse = await fetch(
      `https://graph.instagram.com/v18.0/${userData.id}/media?fields=id,caption,media_type,timestamp,like_count,comments_count,media_url&access_token=${accessToken}`,
    )

    if (!mediaResponse.ok) {
      console.error("[v0] Failed to fetch media data")
      return NextResponse.json({ error: "Failed to fetch Instagram posts" }, { status: 400 })
    }

    const mediaData = await mediaResponse.json()
    const posts: IGMedia[] = mediaData.data || []

    const stats = {
      username: userData.username,
      profilePicture: userData.profile_picture_url,
      followerCount: userData.followers_count,
      followingCount: userData.follows_count,
      mediaCount: userData.media_count,
      biography: userData.biography,
      posts: posts.map((post) => ({
        id: post.id,
        caption: post.caption || "",
        mediaType: post.media_type,
        timestamp: post.timestamp,
        likeCount: post.like_count,
        commentsCount: post.comments_count,
      })),
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("[v0] Stats route error:", error)
    return NextResponse.json({ error: "Failed to process Instagram data" }, { status: 500 })
  }
}
