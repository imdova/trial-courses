"use client";

import React from 'react';
import { ArrowLeft, Download, Eye, Share2 } from 'lucide-react';
import { Button } from '@/components/UI/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/UI/dialog';

interface MaterialViewerProps {
  isOpen: boolean;
  onClose: () => void;
  material: {
    id: string;
    name: string;
    date: string;
    fileType: string;
    downloadUrl: string;
    courseId: string; 
  };
}

const MaterialViewer = ({ isOpen, onClose, material }: MaterialViewerProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-7xl w-[95vw]">
        <DialogHeader>
          <div className="flex items-center justify-between pt-3">
            <button
              onClick={onClose}
              className="hover:text-primary flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft size={20} />
              Back to materials
            </button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => window.open(material?.downloadUrl, '_blank', 'noopener,noreferrer')}
              >
                <Eye size={16} />
                Open in New Tab
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = material?.downloadUrl;
                  link.download = material?.name;
                  link.target = '_blank';
                  link.rel = 'noopener noreferrer';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download size={16} />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  navigator.clipboard.writeText(material?.downloadUrl);
                  // Optional: Show a toast notification
                  alert('Link copied to clipboard!');
                }}
              >
                <Share2 size={16} />
                Copy Link
              </Button>
            </div>
          </div>
          <DialogTitle className="text-xl font-bold">{material?.name}</DialogTitle>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Eye size={16} />
            <span>Last viewed {new Date(material?.date).toLocaleDateString()}</span>
          </div>
        </DialogHeader>

        <div className="mt-4 h-[calc(90vh-200px)] overflow-auto rounded-lg border bg-gray-50">
          {material?.fileType.toLowerCase() === 'pdf' || material?.fileType === 'PDF' ? (
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(material.downloadUrl)}&embedded=true`}
              className="h-full w-full"
              title={material.name}
              onError={(e) => {
                // Fallback to direct URL if Google viewer fails
                const iframe = e.target as HTMLIFrameElement;
                iframe.src = material.downloadUrl;
              }}
            />
          ) : material?.fileType.toLowerCase() === 'docx' || material?.fileType === 'DOCX' ? (
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(material.downloadUrl)}&embedded=true`}
              className="h-full w-full"
              title={material.name}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-center text-gray-500">
                Preview not available. Please download to view.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MaterialViewer;