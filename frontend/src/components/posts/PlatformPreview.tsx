import { Card } from "../../components/ui/card";
import { Avatar } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { 
  Heart, 
  MessageCircle, 
  Share, 
  ThumbsUp,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube
} from "lucide-react";

interface PlatformPreviewProps {
  platform: string;
  content: string;
}

const platformConfigs = {
  Facebook: {
    icon: Facebook,
    bgColor: "bg-blue-600",
    interactions: [
      { icon: ThumbsUp, label: "Like" },
      { icon: MessageCircle, label: "Comment" },
      { icon: Share, label: "Share" }
    ]
  },
  Instagram: {
    icon: Instagram,
    bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
    interactions: [
      { icon: Heart, label: "Like" },
      { icon: MessageCircle, label: "Comment" },
      { icon: Share, label: "Share" }
    ]
  },
  LinkedIn: {
    icon: Linkedin,
    bgColor: "bg-blue-700",
    interactions: [
      { icon: ThumbsUp, label: "Like" },
      { icon: MessageCircle, label: "Comment" },
      { icon: Share, label: "Repost" }
    ]
  },
  Twitter: {
    icon: Twitter,
    bgColor: "bg-sky-500",
    interactions: [
      { icon: Heart, label: "Like" },
      { icon: MessageCircle, label: "Reply" },
      { icon: Share, label: "Retweet" }
    ]
  },
  YouTube: {
    icon: Youtube,
    bgColor: "bg-red-600",
    interactions: [
      { icon: ThumbsUp, label: "Like" },
      { icon: MessageCircle, label: "Comment" },
      { icon: Share, label: "Share" }
    ]
  }
};

export function PlatformPreview({ platform, content }: PlatformPreviewProps) {
  const config = platformConfigs[platform as keyof typeof platformConfigs];
  
  if (!config) return null;

  const Icon = config.icon;

  return (
    <Card className="p-4 shadow-card">
      <div className="space-y-3">
        {/* Platform Header */}
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 ${config.bgColor} rounded-lg flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <Badge variant="secondary" className="text-xs">
              {platform} Preview
            </Badge>
          </div>
        </div>

        {/* Post Preview */}
        <div className="border border-border rounded-lg p-4 bg-muted/30">
          {/* User Profile */}
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-10 h-10">
              <div className="w-full h-full bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">U</span>
              </div>
            </Avatar>
            <div>
              <p className="font-semibold text-sm text-foreground">Your Business</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
          </div>

          {/* Post Content */}
          <div className="mb-4">
            <p className="text-sm text-foreground leading-relaxed">
              {content || "Your post content will appear here..."}
            </p>
          </div>

          {/* Interactions */}
          <div className="flex items-center gap-4 pt-3 border-t border-border">
            {config.interactions.map((interaction) => (
              <Button
                key={interaction.label}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground p-2"
              >
                <interaction.icon className="w-4 h-4" />
                <span className="text-xs">{interaction.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}