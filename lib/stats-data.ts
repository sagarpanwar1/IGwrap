export interface StatsData {
  pageNum: string
  title: string
  subtitle?: string
  stat?: string | number
  label?: string
  details?: Array<{ label: string; value: string | number }>
  roast?: string
  gradient: string
}

export const STATS_PAGES: StatsData[] = [
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
    stat: "47",
    label: "moments shared with the world",
    roast: "That's one post every ~7-8 days. Consistent or lazy? We'll let you decide.",
    gradient: "card-gradient-alt",
  },
  {
    pageNum: "03",
    title: "Best Post",
    subtitle: "Your absolute banger",
    details: [
      { label: "Likes", value: "2,847" },
      { label: "Comments", value: "156" },
      { label: "Type", value: "Sunset photo" },
    ],
    roast: "Your sunset photo got more love than your last 10 posts combined. Stick to golden hour.",
    gradient: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500",
  },
  {
    pageNum: "04",
    title: "Most Liked",
    subtitle: "What your followers really love",
    stat: "3.2K",
    label: "Peak engagement",
    details: [
      { label: "Post Type", value: "Mirror selfie" },
      { label: "Comments", value: "289" },
    ],
    roast: "Your face gets more likes than your accomplishments. Maybe time to rebrand?",
    gradient: "card-gradient",
  },
  {
    pageNum: "05",
    title: "Video Views",
    stat: "12.8K",
    label: "total views on videos",
    details: [
      { label: "Videos Posted", value: "14" },
      { label: "Avg Duration", value: "45s" },
    ],
    roast: "You made 14 videos this year. 12 were blurry. We counted.",
    gradient: "card-gradient-alt",
  },
  {
    pageNum: "06",
    title: "Story Activity",
    subtitle: "Your daily communication",
    details: [
      { label: "Stories Posted", value: "312" },
      { label: "Avg Daily", value: "~1 story" },
      { label: "Peak Hour", value: "7 PM" },
    ],
    roast: "That's almost a story every day. Your 3 AM rant stories are iconic.",
    gradient: "bg-gradient-to-br from-pink-600 to-orange-500",
  },
  {
    pageNum: "07",
    title: "Engagement King/Queen",
    subtitle: "How much your followers love you",
    stat: "8.2%",
    label: "average engagement rate",
    roast: "That's higher than average! Your followers aren't just scrolling past. They actually like you.",
    gradient: "card-gradient",
  },
  {
    pageNum: "08",
    title: "Peak Time",
    subtitle: "When you're most active",
    details: [
      { label: "Most Active Day", value: "Friday" },
      { label: "Most Active Hour", value: "8 PM" },
      { label: "Least Active", value: "Monday 9 AM" },
    ],
    roast: "You're most active on Friday nights. Making us all feel good about procrastinating since 2025.",
    gradient: "card-gradient-alt",
  },
  {
    pageNum: "09",
    title: "Follower Breakdown",
    subtitle: "Your audience vibe",
    details: [
      { label: "Total Followers", value: "2,456" },
      { label: "Gained This Year", value: "+847" },
      { label: "Female %", value: "68%" },
    ],
    roast: "Your follower growth is solid. Though let's be honest, 30% of them are probably bots.",
    gradient: "bg-gradient-to-br from-purple-600 to-pink-600",
  },
  {
    pageNum: "10",
    title: "Your Vibe",
    subtitle: "Your Instagram personality",
    stat: "✨",
    roast:
      "You're 40% aesthetics, 35% authenticity, and 25% chaos. We love it. Keep being you—the internet needs more of this energy.",
    gradient: "card-gradient",
  },
]
