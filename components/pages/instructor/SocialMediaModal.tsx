/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import {
  Instagram,
  Twitter,
  Linkedin,
  Globe,
  Facebook,
  Youtube,
  Trash2,
  X,
} from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useSession } from "next-auth/react";

interface SocialMediaLink {
  platform: string;
  url: string;
  id: string;
}

interface SocialMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: SocialMediaLink[];
  onSave: (data: SocialMediaLink[]) => void;
}

const socialPlatforms = [
  { value: "instagram", label: "Instagram", icon: Instagram, color: "#EF5350" },
  { value: "twitter", label: "Twitter", icon: Twitter, color: "#1DA1F2" },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin, color: "#0077B6" },
  { value: "website", label: "Website", icon: Globe, color: "#0077B6" },
  { value: "facebook", label: "Facebook", icon: Facebook, color: "#1877F2" },
  { value: "youtube", label: "YouTube", icon: Youtube, color: "#FF0000" },
];

const SocialMediaModal: React.FC<SocialMediaModalProps> = ({
  isOpen,
  onClose,
  initialData = [],
  onSave,
}) => {
  const { profile, loading, saveProfile } = useProfile();
  const session = useSession();
  const userId = session.data?.user?.id;
  let links = {
    facebookUrl: profile?.facebookUrl,
    linkedinUrl: profile?.linkedinUrl,
    instagramUrl: profile?.instagramUrl,
    twitterUrl: profile?.twitterUrl,
    youtubeUrl: profile?.youtubeUrl,
    website: profile?.contactEmail
  }
  
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>(() => {
    if (profile) {
      const apiLinks: SocialMediaLink[] = [];
      
      if (links.facebookUrl) {
        apiLinks.push({ platform: "facebook", url: links.facebookUrl, id: "facebook-" + Date.now() });
      }
      
      if (links.linkedinUrl) {
        apiLinks.push({ platform: "linkedin", url: links.linkedinUrl, id: "linkedin-" + Date.now() });
      }
      
      if (links.instagramUrl) {
        apiLinks.push({ platform: "instagram", url: links.instagramUrl, id: "instagram-" + Date.now() });
      }
      
      if (links.twitterUrl) {
        apiLinks.push({ platform: "twitter", url: links.twitterUrl, id: "twitter-" + Date.now() });
      }
      
      if (links.youtubeUrl) {
        apiLinks.push({ platform: "youtube", url: links.youtubeUrl, id: "youtube-" + Date.now() });
      }
      
      if (links.website) {
        apiLinks.push({ platform: "website", url: links.website, id: "website-" + Date.now() });
      }
      
      if (apiLinks.length > 0) {
        return apiLinks;
      }
    }
    
    if (initialData.length > 0) {
      return initialData;
    }
    
    return [
      { platform: "instagram", url: "", id: "1" },
      { platform: "twitter", url: "", id: "2" },
      { platform: "linkedin", url: "", id: "3" },
      { platform: "website", url: "", id: "4" },
    ];
  });

  const [selectedPlatform, setSelectedPlatform] = useState<string>("");

  const handleUrlChange = (id: string, url: string) => {
    setSocialLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, url } : link))
    );
  };

  const handleRemoveLink = (id: string) => {
    setSocialLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const handleAddLink = () => {
    if (selectedPlatform) {
      const newId = Date.now().toString();
      const newLink: SocialMediaLink = {
        platform: selectedPlatform,
        url: "",
        id: newId,
      };
      setSocialLinks((prev) => [...prev, newLink]);
      setSelectedPlatform("");
    }
  };

  const handleSave = () => {
    // Build payload object with only non-empty values
    const payload: any = {};
    
    // Only include fields that have actual values (not empty strings)
    const facebookUrl = socialLinks.find((link) => link.platform === "facebook")?.url;
    if (facebookUrl && facebookUrl.trim() !== "") {
      payload.facebookUrl = facebookUrl;
    }
    
    const linkedinUrl = socialLinks.find((link) => link.platform === "linkedin")?.url;
    if (linkedinUrl && linkedinUrl.trim() !== "") {
      payload.linkedinUrl = linkedinUrl;
    }
    
    const instagramUrl = socialLinks.find((link) => link.platform === "instagram")?.url;
    if (instagramUrl && instagramUrl.trim() !== "") {
      payload.instagramUrl = instagramUrl;
    }
    
    const twitterUrl = socialLinks.find((link) => link.platform === "twitter")?.url;
    if (twitterUrl && twitterUrl.trim() !== "") {
      payload.twitterUrl = twitterUrl;
    }
    
    const youtubeUrl = socialLinks.find((link) => link.platform === "youtube")?.url;
    if (youtubeUrl && youtubeUrl.trim() !== "") {
      payload.youtubeUrl = youtubeUrl;
    }
    
    const contactEmail = socialLinks.find((link) => link.platform === "website")?.url;
    if (contactEmail && contactEmail.trim() !== "") {
      payload.contactEmail = contactEmail;
    }
    
    // Only send the payload if there are actual values to update
    if (Object.keys(payload).length > 0) {
      saveProfile(userId!, payload);
    }
    
    const validLinks = socialLinks.filter((link) => link.url.trim() !== "");
    onSave(validLinks);
    onClose();
  };

  const handleCancel = () => {
    // Reset to initial data
    if (initialData.length === 0) {
      setSocialLinks([
        { platform: "instagram", url: "", id: "1" },
        { platform: "twitter", url: "", id: "2" },
        { platform: "linkedin", url: "", id: "3" },
        { platform: "website", url: "", id: "4" },
      ]);
    } else {
      setSocialLinks(initialData);
    }
    onClose();
  };

  const getPlatformInfo = (platform: string) => {
    return socialPlatforms.find((p) => p.value === platform);
  };

  const getAvailablePlatforms = () => {
    const usedPlatforms = socialLinks.map((link) => link.platform);
    return socialPlatforms.filter(
      (platform) => !usedPlatforms.includes(platform.value)
    );
  };

  const getPlaceholder = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "Enter Instagram";
      case "twitter":
        return "Enter Twitter";
      case "linkedin":
        return "Enter LinkedIn";
      case "website":
        return "Enter Website";
      case "facebook":
        return "Enter Facebook";
      case "youtube":
        return "Enter YouTube";
      default:
        return "Enter URL";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Social Media Links</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4">
          {/* Existing Social Links */}
          {socialLinks.map((link) => {
            const platformInfo = getPlatformInfo(link.platform);
            const IconComponent = platformInfo?.icon || Globe;

            return (
              <div key={link.id} className="space-y-2">
                <label className="text-sm font-medium capitalize">
                  {link.platform}
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <IconComponent
                      className="h-5 w-5"
                      style={{ color: platformInfo?.color }}
                    />
                    <Input
                      placeholder={getPlaceholder(link.platform)}
                      value={link.url}
                      onChange={(e) => handleUrlChange(link.id, e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveLink(link.id)}
                    className="h-8 w-8 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}

          {/* Add New Platform */}
          {getAvailablePlatforms().length > 0 && (
            <div className="space-y-2">
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Link" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailablePlatforms().map((platform) => {
                    const IconComponent = platform.icon;
                    return (
                      <SelectItem key={platform.value} value={platform.value}>
                        <div className="flex items-center gap-2">
                          <IconComponent
                            className="h-4 w-4"
                            style={{ color: platform.color }}
                          />
                          {platform.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {selectedPlatform && (
                <Button
                  variant="outline"
                  onClick={handleAddLink}
                  className="w-full"
                >
                  Add {getPlatformInfo(selectedPlatform)?.label}
                </Button>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1" onClick={handleCancel}>
              CANCEL
            </Button>
            <Button className="flex-1" onClick={handleSave}>
              SAVE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialMediaModal;