import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Switch } from "../../components/ui/switch";
import { Avatar } from "../../components/ui/avatar";
import type { LucideIcon } from "lucide-react";
import { 
  Plus,
  Settings,
  Trash2,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface ConnectedAccount {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  followers: number;
  isActive: boolean;
  lastSync: string;
  accountType: "personal" | "business" | "page";
}

interface Platform {
  name: string;
  icon: LucideIcon;
  bgColor: string;
  connected: boolean;
  accounts: ConnectedAccount[];
}

interface PlatformAccountCardProps {
  platform: Platform;
  onConnect: () => void;
  onDisconnect: (accountId: string) => void;
  onToggleAccount: (accountId: string) => void;
  onAddAccount: () => void;
}

export function PlatformAccountCard({ 
  platform, 
  onConnect, 
  onDisconnect, 
  onToggleAccount, 
  onAddAccount 
}: PlatformAccountCardProps) {
  const Icon = platform.icon;

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <Card className="p-6 shadow-card hover:shadow-elegant transition-smooth">
      {/* Platform Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 ${platform.bgColor} rounded-lg flex items-center justify-center`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{platform.name}</h3>
            <p className="text-sm text-muted-foreground">
              {platform.accounts.length} account{platform.accounts.length !== 1 ? 's' : ''} connected
            </p>
          </div>
        </div>
        
        <Badge variant={platform.connected ? "default" : "secondary"}>
          {platform.connected ? (
            <>
              <CheckCircle className="w-3 h-3 mr-1" />
              Connected
            </>
          ) : (
            <>
              <AlertCircle className="w-3 h-3 mr-1" />
              Not Connected
            </>
          )}
        </Badge>
      </div>

      {/* Connected Accounts */}
      {platform.connected && platform.accounts.length > 0 && (
        <div className="space-y-4 mb-6">
          {platform.accounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  {account.avatar ? (
                    <img src={account.avatar} alt={account.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary-foreground">
                        {account.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{account.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {account.accountType}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">@{account.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFollowers(account.followers)} followers • Last sync: {account.lastSync}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-muted-foreground">Active</label>
                  <Switch
                    checked={account.isActive}
                    onCheckedChange={() => onToggleAccount(account.id)}
                  />
                </div>
                
                <Button variant="ghost" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDisconnect(account.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        {!platform.connected ? (
          <Button
            variant="gradient"
            onClick={onConnect}
            className="flex-1"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Connect {platform.name}
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={onAddAccount}
              className="flex-1"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Account
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}