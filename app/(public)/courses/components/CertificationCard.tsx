import React from "react";
import { Card, CardContent } from "@/components/UI/card";
import { Award } from "lucide-react";

export default function CertificationCard() {
  return (
    <Card className="w-full rounded-2xl border border-neutral-200/40 bg-white/80 shadow-lg backdrop-blur-sm">
      <CardContent className="space-y-3 pt-0">
        <div className="flex items-center gap-3">
          <div className="from-primary to-secondary border-primary rounded-full border bg-gradient-to-tr p-2">
            <Award className="h-6 w-6 fill-yellow-300 stroke-yellow-600 text-yellow-300" />
          </div>
          <div>
            <h3 className="text-base font-medium">Completion Certificate</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              When you finish This Course, you’ll receive an official completion
              certificate that proves your achievement and helps you stand out
              in your career or studies.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 text-sm text-slate-700">
          <p>
            This certification verifies that the course meets our platform’s
            quality standards and includes practical learning designed to ensure
            skill mastery.
          </p>
        </div>

        <div className="flex justify-center pt-3">
          <div className="text-muted-foreground text-center text-sm">
            Enroll today to earn your certificate upon completion.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
