/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from 'react';
import { ArrowLeft, Download, Share2, Clock } from 'lucide-react';
import { Button } from '@/components/UI/button';
import Link from 'next/link';

interface MaterialPageProps {
  params: Promise<{
    videoID: string;
    materialId: string;
  }>;
}

export default async function MaterialPage({ params }: MaterialPageProps) {
  const { videoID, materialId } = await params;
  // In a real app, you would fetch the material data using the materialId

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/courses/view/`}
          className="hover:text-primary mb-4 flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft size={20} />
          Back to course
        </Link>
        
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{"test"}</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => window.open("material.downloadUrl", '_blank')}
            >
              <Download size={16} />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => navigator.clipboard.writeText("material.downloadUrl")}
            >
              <Share2 size={16} />
              Share
            </Button>
          </div>
        </div>
        
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <Clock size={16} />
          <span>Last updated {new Date("material.date").toLocaleDateString()}</span>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="h-[calc(100vh-250px)] rounded-lg border bg-white shadow-sm">
        {true ? (
          <iframe
            src={"/Mohamed.pdf"}
            className="h-full w-full"
            title={"Example Material"}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-center text-gray-500">
              This file type cannot be previewed.
              <br />
              Please download to view.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}