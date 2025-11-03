"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import Image, { ImageProps } from "next/image";
import { cn } from "@/util";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

type AvatarImageProps = Omit<ImageProps, "src" | "alt" | "fill"> & {
  src?: ImageProps["src"];
  alt?: ImageProps["alt"];
  className?: ImageProps["className"];
};

function AvatarImage({
  src,
  alt = "Avatar",
  className,
  ...props
}: AvatarImageProps) {
  const [hasError, setHasError] = React.useState(false);

  if (hasError || !src) return null;
  return (
    <Image
      data-slot="avatar-image"
      src={src}
      alt={alt}
      fill
      className={cn("size-full object-cover", className)}
      onError={() => {
        console.warn("Image failed to load:", src);
        setHasError(true);
      }}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted [&>svg]:text-muted-foreground flex size-full items-center justify-center [&>svg]:size-4",
        className,
      )}
      {...props}
    />
  );
}

const UserAvatar = ({
  src,
  alt,
  size = 40,
  fallback,
  className,
}: {
  src?: string;
  alt?: string;
  size?: number;
  fallback?: React.ReactNode;
  className?: string;
}) => {
  return (
    <Avatar className={className} style={{ width: size, height: size }}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback ?? alt?.[0]}</AvatarFallback>
    </Avatar>
  );
};

export { Avatar, AvatarImage, AvatarFallback, UserAvatar };
