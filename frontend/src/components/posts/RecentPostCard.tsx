import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { MoreHorizontal, Eye, Edit } from "lucide-react";

interface RecentPostCardProps {
  title: string;
  content: string;
  platforms: string[];
  status: "published" | "scheduled" | "draft";
  scheduledTime?: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export function RecentPostCard({ title, content, platforms, status, scheduledTime, engagement }: RecentPostCardProps) {
  const statusColor = {
    published: "bg-green-100 text-green-800",
    scheduled: "bg-blue-100 text-blue-800", 
    draft: "bg-gray-100 text-gray-800"
  };

  return (
    <Card className="p-6 shadow-card hover:shadow-elegant transition-smooth">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{content}</p>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {platforms.map((platform) => (
          <Badge key={platform} variant="secondary" className="text-xs">
            {platform}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{engagement.likes} likes</span>
          <span>{engagement.comments} comments</span>
          <span>{engagement.shares} shares</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge className={statusColor[status]}>
            {status}
          </Badge>
          {status === "scheduled" && scheduledTime && (
            <span className="text-xs text-muted-foreground">{scheduledTime}</span>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button variant="outline" size="sm" className="flex-1">
          <Eye className="w-4 h-4 mr-2" />
          View
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </div>
    </Card>
  );
}