import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { PlatformAccountCard } from "../components/accounts/PlatformAccountCard";
import { ConnectionDialog } from "../components/accounts/ConnectionDialog";
import { useToast } from "../hooks/use-toast";
import { 
  RefreshCw,
  Plus,
  Shield,
  Zap,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Users,
  Activity
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
  icon: any;
  bgColor: string;
  connected: boolean;
  accounts: ConnectedAccount[];
}

export default function ConnectedAccounts() {
  const { toast } = useToast();
  const [connectionDialog, setConnectionDialog] = useState<{
    open: boolean;
    platform?: any;
  }>({ open: false });

  // Mock data for connected accounts
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      name: "Facebook",
      icon: Facebook,
      bgColor: "bg-blue-600",
      connected: true,
      accounts: [
        {
          id: "fb-1",
          name: "Business Page",
          username: "mybusiness",
          followers: 12500,
          isActive: true,
          lastSync: "2 hours ago",
          accountType: "page" as const
        },
        {
          id: "fb-2", 
          name: "Personal Account",
          username: "john.doe",
          followers: 850,
          isActive: false,
          lastSync: "1 day ago",
          accountType: "personal" as const
        }
      ]
    },
    {
      name: "Instagram",
      icon: Instagram,
      bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
      connected: true,
      accounts: [
        {
          id: "ig-1",
          name: "Business Account",
          username: "mybusiness_official",
          followers: 8750,
          isActive: true,
          lastSync: "30 minutes ago",
          accountType: "business" as const
        }
      ]
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      bgColor: "bg-blue-700",
      connected: true,
      accounts: [
        {
          id: "li-1",
          name: "Company Page",
          username: "my-company",
          followers: 2350,
          isActive: true,
          lastSync: "1 hour ago",
          accountType: "business" as const
        }
      ]
    },
    {
      name: "Twitter",
      icon: Twitter,
      bgColor: "bg-sky-500",
      connected: false,
      accounts: []
    },
    {
      name: "YouTube",
      icon: Youtube,
      bgColor: "bg-red-600",
      connected: false,
      accounts: []
    }
  ]);

  const handleConnect = (platform: any) => {
    setConnectionDialog({ open: true, platform });
  };

  const handleConnectionComplete = (credentials: any) => {
    // Mock successful connection
    setPlatforms(prev => prev.map(p => 
      p.name === credentials.platform 
        ? { ...p, connected: true, accounts: [...p.accounts, {
            id: `${p.name.toLowerCase()}-new`,
            name: "New Account",
            username: "newaccount",
            followers: 0,
            isActive: true,
            lastSync: "Just now",
            accountType: "personal" as const
          }]}
        : p
    ));

    toast({
      title: "Account Connected",
      description: `Successfully connected your ${credentials.platform} account.`,
    });
  };

  const handleDisconnect = (accountId: string) => {
    setPlatforms(prev => prev.map(platform => ({
      ...platform,
      accounts: platform.accounts.filter(acc => acc.id !== accountId)
    })));

    toast({
      title: "Account Disconnected",
      description: "Account has been removed from your connected accounts.",
      variant: "destructive"
    });
  };

  const handleToggleAccount = (accountId: string) => {
    setPlatforms(prev => prev.map(platform => ({
      ...platform,
      accounts: platform.accounts.map(acc => 
        acc.id === accountId ? { ...acc, isActive: !acc.isActive } : acc
      )
    })));
  };

  const handleAddAccount = (platformName: string) => {
    const platform = platforms.find(p => p.name === platformName);
    if (platform) {
      handleConnect(platform);
    }
  };

  const connectedCount = platforms.filter(p => p.connected).length;
  const totalAccounts = platforms.reduce((sum, p) => sum + p.accounts.length, 0);
  const activeAccounts = platforms.reduce((sum, p) => 
    sum + p.accounts.filter(acc => acc.isActive).length, 0);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Connected Accounts</h1>
          <p className="text-muted-foreground">
            Manage your social media platform connections and account settings
          </p>
        </div>
        <Button variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Sync All
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{connectedCount}/5</p>
              <p className="text-sm text-muted-foreground">Platforms Connected</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalAccounts}</p>
              <p className="text-sm text-muted-foreground">Total Accounts</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{activeAccounts}</p>
              <p className="text-sm text-muted-foreground">Active Accounts</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Security Notice */}
      <Card className="p-6 bg-blue-50 border border-blue-200">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Secure Connection</h3>
            <p className="text-sm text-blue-800 mb-3">
              All account connections are secured using OAuth 2.0 authentication. Your login credentials 
              are never stored on our servers. You can revoke access at any time from your platform settings.
            </p>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-white border-blue-300 text-blue-800">
                OAuth 2.0 Secured
              </Badge>
              <Badge variant="outline" className="bg-white border-blue-300 text-blue-800">
                End-to-End Encrypted
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {platforms.map((platform) => (
          <PlatformAccountCard
            key={platform.name}
            platform={platform}
            onConnect={() => handleConnect(platform)}
            onDisconnect={handleDisconnect}
            onToggleAccount={handleToggleAccount}
            onAddAccount={() => handleAddAccount(platform.name)}
          />
        ))}
      </div>

      {/* Connection Dialog */}
      <ConnectionDialog
        open={connectionDialog.open}
        onOpenChange={(open) => setConnectionDialog({ open, platform: open ? connectionDialog.platform : undefined })}
        platform={connectionDialog.platform}
        onConnect={handleConnectionComplete}
      />
    </div>
  );
}