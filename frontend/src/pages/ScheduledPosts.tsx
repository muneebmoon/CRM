import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar, Clock, Edit, Trash2 } from "lucide-react";

export default function ScheduledPosts() {
  const scheduledPosts = [
    {
      id: 1,
      title: "Product Update Announcement",
      content: "Excited to share our latest product updates with improved performance and new features...",
      platforms: ["Facebook", "LinkedIn", "Instagram"],
      scheduledDate: "2024-01-15",
      scheduledTime: "09:00 AM",
      status: "scheduled"
    },
    {
      id: 2,
      title: "Team Achievement",
      content: "Celebrating our team's incredible achievement this quarter...",
      platforms: ["LinkedIn"],
      scheduledDate: "2024-01-16",
      scheduledTime: "02:00 PM",
      status: "scheduled"
    },
    {
      id: 3,
      title: "Weekend Inspiration",
      content: "Some motivational thoughts for the weekend...",
      platforms: ["Instagram", "Facebook"],
      scheduledDate: "2024-01-20",
      scheduledTime: "08:00 AM",
      status: "scheduled"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Scheduled Posts</h1>
          <p className="text-muted-foreground">
            Manage and edit your upcoming scheduled posts
          </p>
        </div>
        <Button variant="gradient">
          Schedule New Post
        </Button>
      </div>

      {/* Calendar View Toggle */}
      <div className="flex gap-2">
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          Calendar View
        </Button>
        <Button variant="ghost">
          List View
        </Button>
      </div>

      {/* Scheduled Posts List */}
      <div className="space-y-4">
        {scheduledPosts.map((post) => (
          <Card key={post.id} className="p-6 shadow-card hover:shadow-elegant transition-smooth">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{post.title}</h3>
                  <Badge variant="secondary">
                    <Clock className="w-3 h-3 mr-1" />
                    Scheduled
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.content}
                </p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {post.scheduledDate} at {post.scheduledTime}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.platforms.map((platform) => (
                      <Badge key={platform} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {scheduledPosts.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Scheduled Posts</h3>
          <p className="text-muted-foreground mb-4">
            You don't have any posts scheduled yet. Create your first scheduled post!
          </p>
          <Button variant="gradient">
            Schedule a Post
          </Button>
        </div>
      )}
    </div>
  );
}