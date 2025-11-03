import { Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";

const PublicContactInfoSection = ({
  email,
  phone,
}: {
  email: string;
  phone: string;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-muted-foreground text-sm">
          <Mail className="mr-2 inline-block size-4" />
          {email || "Not available"}
        </p>
        <p className="text-muted-foreground text-sm">
          <Phone className="mr-2 inline-block size-4" />
          {phone || "Not available"}
        </p>
      </CardContent>
    </Card>
  );
};
export default PublicContactInfoSection;
