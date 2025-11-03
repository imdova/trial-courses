"use client";
import Link from "next/link";
import { Switch } from "@/components/UI/switch";
import { Button } from "@/components/UI/button";
import { Pen } from "lucide-react";
import { Label } from "@/components/UI/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import { useProfile } from "@/hooks/useProfile";
import { useSession } from "next-auth/react";
import { useState } from "react";

const PublicProfile: React.FC<{ user: InstructorData }> = ({ user }) => {
  const { saveProfile, updating } = useProfile();
  const { data: session } = useSession();
  const [isPublic, setIsPublic] = useState(user?.isPublic || false);

  const handleTogglePublic = async (checked: boolean) => {
    try {
      setIsPublic(checked);
      
      if (session?.user?.id) {
        // Create updated profile data with the new isPublic value
        const profileData = {
          isPublic: checked
        };

        await saveProfile(session.user.id, profileData);
      }
    } catch (error) {
      console.error("Error updating public profile status:", error);
      // Revert the state if the API call fails
      setIsPublic(!checked);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Public Profile</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <Label htmlFor="public-profile">Public Profile</Label>
          <Switch 
            id="public-profile" 
            checked={isPublic}
            onCheckedChange={handleTogglePublic}
            disabled={updating}
          />
        </div>
        {isPublic && (
          <div className="rounded-base bg-primary/10 my-1 flex items-center justify-between p-2 py-3">
            <div>
              <p className="text-muted-foreground text-sm">
                Public profile link:
              </p>
              <Link
                target="_blank"
                href={`https://courses.medicova.net/in/${user.userName}?public=true`}
                className="text-primary text-sm underline"
              >
                in/{user.userName}
              </Link>
            </div>
            <Button size="icon" className="size-7" variant="outline">
              <Pen className="text-muted-foreground size-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PublicProfile;
