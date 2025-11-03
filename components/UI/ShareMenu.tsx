"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import {
  Share2,
  LinkIcon,
  Mail,
  MessageCircle,
  Send,
  Twitter,
  Linkedin,
  Facebook,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import Divider from "./Divider";

/**
 * ShareMenu — a compact share button + dropdown built with shadcn/ui
 *
 * Usage:
 *  <ShareMenu url={"https://example.com/post/123"} title="Cool Post" text="Check this out!" />
 */
export default function ShareMenu({
  url,
  title = "",
  text = "",
  children,
}: {
  url: string;
  title?: string;
  text?: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = React.useState(false);

  const shareUrl = React.useMemo(() => encodeURI(url || ""), [url]);
  const shareText = React.useMemo(
    () => encodeURIComponent(text || title || ""),
    [text, title],
  );
  const shareTitle = React.useMemo(
    () => encodeURIComponent(title || document?.title || ""),
    [title],
  );

  const canNativeShare =
    typeof navigator !== "undefined" &&
    !!navigator.share &&
    !!navigator.canShare;

  function openWindow(href: string) {
    if (typeof window === "undefined") return;
    const w = 700;
    const h = 600;
    const y = window.top?.outerHeight
      ? Math.max(0, (window.top.outerHeight - h) / 2)
      : 0;
    const x = window.top?.outerWidth
      ? Math.max(0, (window.top.outerWidth - w) / 2)
      : 0;
    window.open(
      href,
      "share",
      `width=${w},height=${h},left=${x},top=${y},noopener,noreferrer`,
    );
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied", {
        description: "URL saved to your clipboard.",
      });
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy link", {
        description: "Please copy it manually.",
      });
    }
  }

  async function handleNativeShare() {
    try {
      if (canNativeShare) {
        await navigator.share({ title, text: text || title, url });
      } else {
        toast.error("Sharing not supported", {
          description: "Use the options below.",
        });
      }
    } catch {
      // User cancelled or share failed — no toast needed
    }
  }

  // prebuilt links
  const links = {
    x: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`,
    telegram: `https://t.me/share/url?url=${shareUrl}&text=${shareText}`,
    email: `mailto:?subject=${shareTitle}&body=${shareText}%0A%0A${shareUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
  } as const;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" sideOffset={8}>
        <DropdownMenuLabel>Share</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleNativeShare}
            disabled={!canNativeShare}
          >
            <Share2 className="mr-2 h-4 w-4" />
            <span>Share via system…</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopy}>
            {copied ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <LinkIcon className="mr-2 h-4 w-4" />
            )}
            <span>{copied ? "Copied" : "Copy link"}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <Divider className="my-1" />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => openWindow(links.x)}>
            <Twitter className="mr-2 h-4 w-4" />
            <span>Post on X</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openWindow(links.facebook)}>
            <Facebook className="mr-2 h-4 w-4" />
            <span>Share on Facebook</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openWindow(links.linkedin)}>
            <Linkedin className="mr-2 h-4 w-4" />
            <span>Share on LinkedIn</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openWindow(links.whatsapp)}>
            <MessageCircle className="mr-2 h-4 w-4" />
            <span>Send on WhatsApp</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openWindow(links.telegram)}>
            <Send className="mr-2 h-4 w-4" />
            <span>Send on Telegram</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => (window.location.href = links.email)}
          >
            <Mail className="mr-2 h-4 w-4" />
            <span>Send via Email</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
