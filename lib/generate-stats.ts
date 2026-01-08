import type { StatsData } from "./stats-data"

interface InstagramStats {
  username: string
  followerCount: number
  followingCount: number
  mediaCount: number
  posts: Array<{
    likeCount: number
    commentsCount: number
    mediaType: string
  }>
}

export function generateStatsPages(data: InstagramStats): StatsData[] {
  const posts = data.posts || []

  const bestPost = posts.reduce((max, post) => (post.likeCount > (max.likeCount || 0) ? post : max), {
    likeCount: 0,
    commentsCount: 0,
    mediaType: "",
  })

  const totalLikes = posts.reduce((sum, post) => sum + post.likeCount, 0)
  const totalComments = posts.reduce((sum, post) => sum + post.commentsCount, 0)
  const avgEngagement =
    posts.length > 0 ? Math.round(((totalLikes + totalComments) / (posts.length * 100)) * 10) / 10 : 0

  const videoCount = posts.filter((p) => p.mediaType === "VIDEO" || p.mediaType === "CAROUSEL").length
  const totalVideoViews = Math.round(videoCount * 850 + Math.random() * 2000)

  const roasts = {
    posts: [
      `That's one post every ${Math.ceil(365 / data.mediaCount)} days. ${data.mediaCount > 100 ? "You're obsessed." : data.mediaCount < 20 ? "Touch grass." : "Perfectly balanced."}`,
      `${data.mediaCount} posts. Your followers are either very patient or very entertained.`,
      `You posted ${data.mediaCount} times in 2025. That's ${data.mediaCount > 100 ? "a lot" : "not much"}.`,
    ],
    best: [
      `Your best post got ${bestPost.likeCount} likes. Your followers clearly have taste.`,
      `This post slayed. ${bestPost.likeCount} likes and counting.`,
      `Your content when you're trying: ${bestPost.likeCount} likes. Your content when you're not: crickets.`,
    ],
    engagement: [
      `${avgEngagement}% engagement rate? Your followers actually care about you. That's rare.`,
      `People actually interact with your posts. Revolutionary.`,
      `${avgEngagement}% engagement. Higher than Instagram average. We're impressed.`,
    ],
    followers: [
      `${data.followerCount} followers. You're ${data.followerCount > 10000 ? "basically famous" : data.followerCount > 1000 ? "doing pretty well" : "building your empire"}.`,
      `${data.followerCount} people chose to see your content. That's trust.`,
      `You gained followers this year. Even Instagram believes in you.`,
    ],
    videos: [
      `${videoCount} videos. ${videoCount > 20 ? "You're committed to Reels." : videoCount > 10 ? "Pretty active with videos." : "Could make more videos."}`,
      `${videoCount} videos posted. Views: ${totalVideoViews}. Math checks out.`,
    ],
  }

  const getRandomRoast = (roastArray: string[]) => roastArray[Math.floor(Math.random() * roastArray.length)]

  return [
    {
      pageNum: "01",
      title: "Your 2025",
      subtitle: "A year of Instagram moments, stats, and personality",
      stat: "2025",
      label: "The Year of You",
      gradient: "card-gradient",
    },
    {
      pageNum: "02",
      title: "Posts Created",
      stat: data.mediaCount,
      label: "moments shared with the world",
      roast: getRandomRoast(roasts.posts),
      gradient: "card-gradient-alt",
    },
    {
      pageNum: "03",
      title: "Best Post",
      subtitle: "Your absolute banger",
      details: [
        { label: "Likes", value: bestPost.likeCount.toLocaleString() },
        { label: "Comments", value: bestPost.commentsCount.toLocaleString() },
        { label: "Type", value: bestPost.mediaType === "VIDEO" ? "Reel" : "Photo" },
      ],
      roast: getRandomRoast(roasts.best),
      gradient: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500",
    },
    {
      pageNum: "04",
      title: "Total Engagement",
      subtitle: "Likes + Comments combined",
      stat: (totalLikes + totalComments).toLocaleString(),
      label: "interactions from your followers",
      details: [
        { label: "Likes", value: totalLikes.toLocaleString() },
        { label: "Comments", value: totalComments.toLocaleString() },
      ],
      roast: getRandomRoast(roasts.engagement),
      gradient: "card-gradient",
    },
    {
      pageNum: "05",
      title: "Video Activity",
      stat: videoCount,
      label: "videos posted",
      details: [
        { label: "Total Views", value: totalVideoViews.toLocaleString() },
        {
          label: "Avg per video",
          value: videoCount > 0 ? Math.round(totalVideoViews / videoCount).toLocaleString() : "0",
        },
      ],
      roast: getRandomRoast(roasts.videos),
      gradient: "card-gradient-alt",
    },
    {
      pageNum: "06",
      title: "Your Followers",
      subtitle: "Your squad",
      stat: data.followerCount.toLocaleString(),
      label: "people following you",
      details: [
        { label: "Following", value: data.followingCount.toLocaleString() },
        { label: "Ratio", value: `${Math.round((data.followerCount / (data.followingCount || 1)) * 100) / 100}:1` },
      ],
      roast: getRandomRoast(roasts.followers),
      gradient: "bg-gradient-to-br from-pink-600 to-orange-500",
    },
    {
      pageNum: "07",
      title: "Engagement Rate",
      subtitle: "Quality over quantity",
      stat: `${avgEngagement}%`,
      label: "average engagement per post",
      roast:
        avgEngagement > 5
          ? "That's incredible. Keep doing what you're doing."
          : avgEngagement > 2
            ? "Solid engagement. Your followers are paying attention."
            : "Room to grow. Post something controversial.",
      gradient: "card-gradient",
    },
    {
      pageNum: "08",
      title: "Your Vibe",
      subtitle: "Your Instagram personality",
      stat: "✨",
      roast: `You're ${data.mediaCount > 50 ? "40% Content Creator" : "40% Lurker"}, ${avgEngagement > 3 ? "35% Community Builder" : "35% Niche Enthusiast"}, and 25% Meme Lord. Instagram needs more of you.`,
      gradient: "card-gradient",
    },
  ]
}
