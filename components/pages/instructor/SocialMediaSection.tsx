/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import {
  Facebook,
  Globe,
  Instagram,
  Link2,
  Linkedin,
  Pen,
  Twitter,
  Youtube,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/UI/Tooltip";
import { Key, useState } from "react";
import SocialMediaModal from "./SocialMediaModal";
import { useProfile } from "@/hooks/useProfile";
import { UrlObject } from "url";

type SocialMediaSectionProps = {
  user: InstructorData | TrainingCenter;
};

interface SocialMediaLink {
  platform: string;
  url: string;
  id: string;
}

// Icons mapping
const socialMediaIcons: Record<string, React.ReactNode> = {
  instagram: <Instagram className="text-[#EF5350] size-5" />,
  twitter: <Twitter className="size-5 text-[#1DA1F2]" />,
  linkedin: <Linkedin className="size-5 text-[#0077B6]" />,
  website: <Globe className="size-5 text-[#0077B6]" />,
  facebook: <Facebook className="size-5 text-[#1877F2]" />,
  youtube: <Youtube className="size-5 text-[#FF0000]" />,
};

// Main Component
const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { profile, loading, saveProfile } = useProfile();
  const links = {
    facebookUrl: profile?.facebookUrl,
    linkedinUrl: profile?.linkedinUrl,
    instagramUrl: profile?.instagramUrl,
    twitterUrl: profile?.twitterUrl,
    youtubeUrl: profile?.youtubeUrl,
    website: profile?.contactEmail
  }
  
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[] | any>(() => {
    const apiLinks: SocialMediaLink[] = [];
    if (profile) {
      
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
    
      if (apiLinks.length > 0) {
        return apiLinks;
      }
    
    return [
      { platform: "instagram", url: "", id: "1" },
      { platform: "twitter", url: "", id: "2" },
      { platform: "linkedin", url: "", id: "3" },
      { platform: "website", url: "", id: "4" },
    ];
  });

  // Convert user social links to our format (if they exist)
  // const socialLinks = user.socialLinks || {};

  const handleSaveSocialLinks = (newLinks: SocialMediaLink[]) => {
    setSocialLinks(newLinks);
    // Here you would typically save to your backend
    console.log("Saving social links:", newLinks);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardAction>
            <Button size="icon" variant="outline" onClick={handleOpenModal}>
              <Pen className="text-muted-foreground" />
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          {socialLinks.length === 0 ? (
            <p className="text-muted-foreground">No social media links found.</p>
          ) : (
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link: { id: Key | null | undefined; url: string | UrlObject; platform: string; }) => (
                <Tooltip key={link.id}>
                  <TooltipTrigger asChild>
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform"
                    >
                      {socialMediaIcons[link.platform]}
                    </Link>
                  </TooltipTrigger>
                  {/* <TooltipContent>
                    {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                  </TooltipContent> */}
                </Tooltip>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <SocialMediaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialData={socialLinks}
        onSave={handleSaveSocialLinks}
      />
    </>
  );
};

export default SocialMediaSection;
