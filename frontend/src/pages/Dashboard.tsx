import { StatsCard } from "../components/dashboard/StatsCard";
import { PlatformCard } from "../components/platforms/PlatformCard";
import { RecentPostCard } from "../components/posts/RecentPostCard";
import { 
  BarChart3, 
  Users, 
  Calendar, 
  TrendingUp,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  Youtube
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Followers",
      value: "12.5K",
      change: "+2.5% from last month",
      icon: Users,
      trend: "up" as const
    },
    {
      title: "Posts This Month",
      value: "24",
      change: "+12% from last month", 
      icon: BarChart3,
      trend: "up" as const
    },
    {
      title: "Scheduled Posts",
      value: "8",
      change: "Next: Tomorrow 9 AM",
      icon: Calendar,
      trend: "neutral" as const
    },
    {
      title: "Engagement Rate",
      value: "4.2%",
      change: "+0.8% from last month",
      icon: TrendingUp,
      trend: "up" as const
    }
  ];

  const platforms = [
    {
      name: "Facebook",
      icon: Facebook,
      connected: true,
      accounts: 2,
      lastPost: "2 hours ago",
      bgColor: "bg-blue-600"
    },
    {
      name: "Instagram", 
      icon: Instagram,
      connected: true,
      accounts: 1,
      lastPost: "4 hours ago",
      bgColor: "bg-pink-600"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      connected: true,
      accounts: 1,
      lastPost: "1 day ago", 
      bgColor: "bg-blue-700"
    },
    {
      name: "Twitter",
      icon: Twitter,
      connected: false,
      accounts: 0,
      lastPost: "Never",
      bgColor: "bg-sky-500"
    },
    {
      name: "YouTube",
      icon: Youtube,
      connected: false,
      accounts: 0,
      lastPost: "Never",
      bgColor: "bg-red-600"
    }
  ];

  const recentPosts = [
    {
      title: "Product Launch Announcement",
      content: "Excited to announce our latest product that will revolutionize the way you work...",
      platforms: ["Facebook", "LinkedIn", "Instagram"],
      status: "published" as const,
      engagement: { likes: 156, comments: 23, shares: 12 }
    },
    {
      title: "Weekly Team Update",
      content: "This week our team achieved some incredible milestones...",
      platforms: ["LinkedIn"],
      status: "scheduled" as const,
      scheduledTime: "Tomorrow 9 AM",
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      title: "Behind the Scenes",
      content: "Take a look at what goes into creating our products...",
      platforms: ["Instagram", "Facebook"],
      status: "draft" as const,
      engagement: { likes: 0, comments: 0, shares: 0 }
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your social media presence and recent activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Platform Status */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Connected Platforms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {platforms.map((platform) => (
            <PlatformCard key={platform.name} {...platform} />
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post, index) => (
            <RecentPostCard key={index} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}