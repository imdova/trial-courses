"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/UI/dialog";
import { Button } from "@/components/UI/button";
import { Assignment } from "@/types/courses";
import { Archive, Send, Link, AlertTriangle, Mail } from "lucide-react";
import { useAssignments } from "@/app/(auth)/instructor/assignments/hooks/useAssignments";
import { toast } from "sonner";

interface AssignmentActionsModalProps {
  open: boolean;
  onClose: () => void;
  assignment: Assignment | null;
  action: "archive" | "reminder" | "link" | null;
}

const AssignmentActionsModal: React.FC<AssignmentActionsModalProps> = ({
  open,
  onClose,
  assignment,
  action,
}) => {
  const [loading, setLoading] = useState(false);
  const [reminderMessage, setReminderMessage] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const { removeAssignment, sendAssignmentReminder } = useAssignments();

  const handleArchive = async () => {
    if (!assignment) return;
    
    setLoading(true);
    try {
      await removeAssignment(assignment.id);
      console.log(`Assignment ${assignment.name} archived successfully`);
      onClose();
    } catch (error) {
      console.error("Error archiving assignment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendReminder = async () => {
    if (!assignment) return;
    
    setLoading(true);
    try {
      const result = await sendAssignmentReminder(assignment.id, reminderMessage);
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success("Reminder sent successfully!");
        onClose();
      } else {
        toast.error("Failed to send reminder");
        console.error("Failed to send reminder:", result.meta);
      }
    } catch (error) {
      toast.error("Error sending reminder");
      console.error("Error sending reminder:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLink = async () => {
    if (!assignment) return;
    
    setLoading(true);
    try {
      // In a real implementation, you would call an API to create/update assignment link
      console.log(`Creating link for ${assignment.name}:`, linkUrl);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Assignment link created successfully");
      onClose();
    } catch (error) {
      console.error("Error creating assignment link:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderArchiveContent = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <AlertTriangle className="text-orange-600" size={20} />
        <div>
          <h4 className="font-medium text-orange-800">Archive Assignment</h4>
          <p className="text-sm text-orange-600">
            This will move the assignment to archived status. Students will no longer be able to submit.
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Assignment Details:</h4>
        <div className="bg-gray-50 p-3 rounded-lg space-y-1">
          <p><span className="font-medium">Title:</span> {assignment?.name}</p>
          {/* <p><span className="font-medium">Due Date:</span> {assignment?.dueDate}</p>
          <p><span className="font-medium">Submissions:</span> {assignment?.submissions}</p> */}
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button 
          onClick={handleArchive} 
          disabled={loading}
          className="bg-orange-600 hover:bg-orange-700"
        >
          {loading ? "Archiving..." : "Archive Assignment"}
        </Button>
      </div>
    </div>
  );

  const renderReminderContent = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <Mail className="text-blue-600" size={20} />
        <div>
          <h4 className="font-medium text-blue-800">Send Reminder</h4>
          <p className="text-sm text-blue-600">
            Send a reminder notification to all students about this assignment.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Assignment Details:</h4>
        <div className="bg-gray-50 p-3 rounded-lg space-y-1">
          <p><span className="font-medium">Title:</span> {assignment?.name}</p>
          {/* <p><span className="font-medium">Due Date:</span> {assignment?.dueDate}</p>
          <p><span className="font-medium">Students:</span> {assignment?.submissions} enrolled</p> */}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="reminder-message" className="block text-sm font-medium">
          Custom Message (Optional)
        </label>
        <textarea
          id="reminder-message"
          value={reminderMessage}
          onChange={(e) => setReminderMessage(e.target.value)}
          placeholder="Add a custom message to include with the reminder..."
          className="w-full p-3 border border-gray-300 rounded-lg resize-none"
          rows={3}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button 
          onClick={handleSendReminder} 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send Reminder"}
        </Button>
      </div>
    </div>
  );

  const renderLinkContent = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
        <Link className="text-green-600" size={20} />
        <div>
          <h4 className="font-medium text-green-800">Create Assignment Link</h4>
          <p className="text-sm text-green-600">
            Create or update a direct link for students to access this assignment.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Assignment Details:</h4>
        <div className="bg-gray-50 p-3 rounded-lg space-y-1">
          <p><span className="font-medium">Title:</span> {assignment?.name}</p>
          {/* <p><span className="font-medium">Course:</span> {assignment?.course}</p>
          <p><span className="font-medium">Status:</span> {assignment?.status}</p> */}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="assignment-link" className="block text-sm font-medium">
          Assignment Link URL
        </label>
        <input
          id="assignment-link"
          type="url"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          placeholder="https://example.com/assignment-link"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <p className="text-xs text-gray-500">
          Enter a custom URL or leave empty to generate an automatic link.
        </p>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button 
          onClick={handleCreateLink} 
          disabled={loading}
          className="bg-green-600 hover:bg-green-700"
        >
          {loading ? "Creating..." : "Create Link"}
        </Button>
      </div>
    </div>
  );

  const getTitle = () => {
    switch (action) {
      case "archive":
        return "Archive Assignment";
      case "reminder":
        return "Send Reminder";
      case "link":
        return "Assignment Link";
      default:
        return "Assignment Action";
    }
  };

  const getIcon = () => {
    switch (action) {
      case "archive":
        return <Archive size={20} />;
      case "reminder":
        return <Send size={20} />;
      case "link":
        return <Link size={20} />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (action) {
      case "archive":
        return renderArchiveContent();
      case "reminder":
        return renderReminderContent();
      case "link":
        return renderLinkContent();
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIcon()}
            {getTitle()}
          </DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentActionsModal;