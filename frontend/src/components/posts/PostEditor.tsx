import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { 
  ImagePlus, 
  Video, 
  Link, 
  Smile, 
  Hash,
  AtSign,
  Calendar,
  Send
} from "lucide-react";

interface PostEditorProps {
  selectedPlatforms: string[];
  onContentChange: (content: string) => void;
  onSchedule: () => void;
  onPublishNow: () => void;
}

export function PostEditor({ selectedPlatforms, onContentChange, onSchedule, onPublishNow }: PostEditorProps) {
  const [content, setContent] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const handleContentChange = (value: string) => {
    setContent(value);
    onContentChange(value);
  };

  const mediaActions = [
    { icon: ImagePlus, label: "Add Image", action: () => {} },
    { icon: Video, label: "Add Video", action: () => {} },
    { icon: Link, label: "Add Link", action: () => {} },
  ];

  const formatActions = [
    { icon: Smile, label: "Emoji", action: () => {} },
    { icon: Hash, label: "Hashtag", action: () => {} },
    { icon: AtSign, label: "Mention", action: () => {} },
  ];

  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-4">
        {/* Selected Platforms */}
        <div className="flex flex-wrap gap-2">
          {selectedPlatforms.map((platform) => (
            <Badge key={platform} variant="default" className="bg-gradient-primary">
              {platform}
            </Badge>
          ))}
        </div>

        {/* Content Editor */}
        <div className="space-y-3">
          <Textarea
            placeholder="What's on your mind? Write your post content here..."
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            className="min-h-32 resize-none border-2 focus:border-primary/50 transition-smooth"
          />
          
          <div className="text-sm text-muted-foreground text-right">
            {content.length}/2200 characters
          </div>
        </div>

        {/* Media Actions */}
        <div className="flex flex-wrap gap-2">
          {mediaActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              onClick={action.action}
              className="flex items-center gap-2"
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </Button>
          ))}
        </div>

        {/* Format Actions */}
        <div className="flex flex-wrap gap-2">
          {formatActions.map((action) => (
            <Button
              key={action.label}
              variant="ghost"
              size="sm"
              onClick={action.action}
              className="flex items-center gap-2"
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </Button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={onSchedule}
            className="flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Schedule
          </Button>
          
          <Button
            variant="gradient"
            onClick={onPublishNow}
            className="flex items-center gap-2 flex-1"
          >
            <Send className="w-4 h-4" />
            Publish Now
          </Button>
        </div>
      </div>
    </Card>
  );
}