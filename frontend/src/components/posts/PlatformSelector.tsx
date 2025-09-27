// import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { 
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube
} from "lucide-react";

interface PlatformSelectorProps {
  selectedPlatforms: string[];
  onSelectionChange: (platforms: string[]) => void;
}

const platforms = [
  {
    name: "Facebook",
    icon: Facebook,
    bgColor: "bg-blue-600",
    connected: true,
    accounts: 2
  },
  {
    name: "Instagram", 
    icon: Instagram,
    bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
    connected: true,
    accounts: 1
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    bgColor: "bg-blue-700",
    connected: true,
    accounts: 1
  },
  {
    name: "Twitter",
    icon: Twitter,
    bgColor: "bg-sky-500",
    connected: false,
    accounts: 0
  },
  {
    name: "YouTube",
    icon: Youtube,
    bgColor: "bg-red-600",
    connected: false,
    accounts: 0
  }
];

export function PlatformSelector({ selectedPlatforms, onSelectionChange }: PlatformSelectorProps) {
  const handlePlatformToggle = (platformName: string) => {
    const isSelected = selectedPlatforms.includes(platformName);
    if (isSelected) {
      onSelectionChange(selectedPlatforms.filter(p => p !== platformName));
    } else {
      onSelectionChange([...selectedPlatforms, platformName]);
    }
  };

  const selectAll = () => {
    const connectedPlatforms = platforms.filter(p => p.connected).map(p => p.name);
    onSelectionChange(connectedPlatforms);
  };

  const clearAll = () => {
    onSelectionChange([]);
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Select Platforms</h3>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear All
            </Button>
            <Button variant="outline" size="sm" onClick={selectAll}>
              Select All Connected
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isSelected = selectedPlatforms.includes(platform.name);
            const isDisabled = !platform.connected;

            return (
              <div
                key={platform.name}
                className={`flex items-center gap-4 p-3 rounded-lg border transition-smooth ${
                  isSelected 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50"
                } ${isDisabled ? "opacity-50" : ""}`}
              >
                <Checkbox
                  checked={isSelected}
                  disabled={isDisabled}
                  onCheckedChange={() => handlePlatformToggle(platform.name)}
                />
                
                <div className={`w-10 h-10 ${platform.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <p className="font-medium text-foreground">{platform.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {platform.connected 
                      ? `${platform.accounts} account${platform.accounts !== 1 ? 's' : ''} connected`
                      : "Not connected"
                    }
                  </p>
                </div>

                {!platform.connected && (
                  <Button variant="platform" size="sm">
                    Connect
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}