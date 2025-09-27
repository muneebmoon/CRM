import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { type LucideIcon, ExternalLink, Key, User, Building } from "lucide-react";

interface ConnectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platform?: {
    name: string;
    icon: LucideIcon;
    bgColor: string;
  };
  onConnect: (credentials: any) => void;
}

export function ConnectionDialog({ open, onOpenChange, platform, onConnect }: ConnectionDialogProps) {
  // Early return if platform is not provided
  if (!platform) {
    return null;
  }

  const Icon = platform.icon;

  const handleConnect = () => {
    // TODO: Implement actual OAuth/API connection logic
    onConnect({
      platform: platform.name,
      // This would contain actual OAuth tokens in a real implementation
    });
    onOpenChange(false);
  };

  const getConnectionInstructions = () => {
    switch (platform.name) {
      case "Facebook":
        return "Connect your Facebook pages and personal account to publish posts and manage your presence.";
      case "Instagram":
        return "Link your Instagram business account to schedule posts and track engagement.";
      case "LinkedIn":
        return "Connect your LinkedIn profile and company pages for professional networking.";
      case "Twitter":
        return "Authorize access to your Twitter account to tweet and engage with your audience.";
      case "YouTube":
        return "Connect your YouTube channel to schedule video posts and manage your content.";
      default:
        return "Connect your social media account to start publishing content.";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`w-8 h-8 ${platform.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            Connect {platform.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            {getConnectionInstructions()}
          </p>

          {/* OAuth Connection */}
          <Card className="p-4 bg-muted/50">
            <div className="flex items-start gap-3">
              <ExternalLink className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">OAuth Connection</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Securely connect through {platform.name}'s official authorization process.
                </p>
                <Button
                  variant="gradient"
                  onClick={handleConnect}
                  className="w-full"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Authorize with {platform.name}
                </Button>
              </div>
            </div>
          </Card>

          {/* API Key Alternative (for demonstration) */}
          <Card className="p-4 bg-muted/50">
            <div className="flex items-start gap-3">
              <Key className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">API Configuration</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Advanced setup for custom API integrations.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="api-key">API Key</Label>
                    <Input
                      id="api-key"
                      placeholder="Enter your API key"
                      type="password"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="api-secret">API Secret</Label>
                    <Input
                      id="api-secret"
                      placeholder="Enter your API secret"
                      type="password"
                    />
                  </div>

                  <div>
                    <Label htmlFor="callback-url">Callback URL</Label>
                    <Input
                      id="callback-url"
                      value="https://your-app.com/auth/callback"
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Permissions Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Required Permissions</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Publish posts to your account</li>
              <li>• Read basic profile information</li>
              <li>• Access engagement metrics</li>
              <li>• Manage scheduled content</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}