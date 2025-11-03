"use client";
import { Button } from "@/components/UI/button";
import { Mail, Pen, Phone } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { useRouter } from "next/navigation";
import { useProfile } from "@/hooks/useProfile";

const ContactInfoSection = () => {
  const router = useRouter();
  const { profile } = useProfile();
  const handleEditClick = () => {
    router.push("/instructor/settings");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Info</CardTitle>
        <CardAction>
          <Button size="icon" variant="outline" onClick={handleEditClick}>
            <Pen className="text-muted-foreground" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-muted-foreground text-sm">
          <Mail className="mr-2 inline-block size-4" />
          {profile?.user.email || "Not available"}
        </p>
        <p className="text-muted-foreground text-sm">
          <Phone className="mr-2 inline-block size-4" />
          {profile?.phoneNumber || "Not available"}
        </p>
      </CardContent>
    </Card>
  );
};
export default ContactInfoSection;
