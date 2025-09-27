import { useState } from "react";
import { PostEditor } from "../components/posts/PostEditor";
import { PlatformSelector } from "../components/posts/PlatformSelector";
import { PlatformPreview } from "../components/posts/PlatformPreview";

export default function CreatePost() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Facebook", "LinkedIn"]);
  const [postContent, setPostContent] = useState("");

  const handleSchedule = () => {
    // TODO: Implement scheduling logic
    console.log("Schedule post", { platforms: selectedPlatforms, content: postContent });
  };

  const handlePublishNow = () => {
    // TODO: Implement publish logic
    console.log("Publish now", { platforms: selectedPlatforms, content: postContent });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Create Post</h1>
        <p className="text-muted-foreground">
          Create and publish content across your connected social media platforms
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Platform Selection */}
        <div className="space-y-6">
          <PlatformSelector 
            selectedPlatforms={selectedPlatforms}
            onSelectionChange={setSelectedPlatforms}
          />
        </div>

        {/* Middle Column - Post Editor */}
        <div className="space-y-6">
          <PostEditor
            selectedPlatforms={selectedPlatforms}
            onContentChange={setPostContent}
            onSchedule={handleSchedule}
            onPublishNow={handlePublishNow}
          />
        </div>

        {/* Right Column - Platform Previews */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Live Preview</h3>
            {selectedPlatforms.length > 0 ? (
              <div className="space-y-4">
                {selectedPlatforms.map((platform) => (
                  <PlatformPreview
                    key={platform}
                    platform={platform}
                    content={postContent}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center border border-dashed border-border rounded-lg">
                <p className="text-muted-foreground">
                  Select platforms to see live previews
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}