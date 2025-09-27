import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { type LucideIcon } from "lucide-react";

interface PlatformCardProps {
  name: string;
  icon: LucideIcon;
  connected: boolean;
  accounts: number;
  lastPost: string;
  bgColor: string;
}

export function PlatformCard({ name, icon: Icon, connected, accounts, lastPost, bgColor }: PlatformCardProps) {
  return (
    <Card className="p-6 shadow-card hover:shadow-elegant transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{accounts} account{accounts !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <Badge variant={connected ? "default" : "secondary"}>
          {connected ? "Connected" : "Disconnected"}
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Last Post</p>
          <p className="text-sm font-medium text-foreground">{lastPost}</p>
        </div>
        
        <Button 
          variant={connected ? "outline" : "gradient"} 
          className="w-full"
        >
          {connected ? "Manage Account" : "Connect Account"}
        </Button>
      </div>
    </Card>
  );
}