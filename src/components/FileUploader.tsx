
import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { nanoid } from "nanoid";

export function FileUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const { user } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setShareLink(null); // Reset share link when a new file is selected
    }
  };

  // Generate a shareable link locally
  const generateShareLink = (shareId: string): string => {
    return `${window.location.origin}/view/${shareId}`;
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) {
      toast({
        title: !selectedFile ? "No file selected" : "Authentication required",
        description: !selectedFile ? "Please select a file to upload." : "Please log in to upload files.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setProgress(0);
    
    try {
      // Generate a unique ID for the share link
      const shareId = nanoid(10);
      
      // Update the filePath to include the user ID as the first folder segment
      // This is critical for our RLS policies to work correctly
      const filePath = `${user.id}/${Date.now()}-${selectedFile.name}`;
      
      // Upload the file to Supabase Storage
      const { data: storageData, error: storageError } = await supabase.storage
        .from('file_uploads')
        .upload(filePath, selectedFile, {
          upsert: true,
        });
      
      if (storageError) throw storageError;
      
      // Track upload progress manually
      const uploadPercent = 100; // Since the upload is complete
      setProgress(uploadPercent);
      
      // Insert the file record in the database
      const { error: dbError } = await supabase
        .from('files')
        .insert({
          name: selectedFile.name,
          size: selectedFile.size,
          type: selectedFile.type,
          storage_path: filePath,
          user_id: user.id,
          share_id: shareId,
        });
      
      if (dbError) throw dbError;
      
      // Generate and set the share link locally
      const localShareLink = generateShareLink(shareId);
      setShareLink(localShareLink);
      
      toast({
        title: "Upload complete",
        description: "Your file has been uploaded successfully.",
      });
      
      // We don't reset selectedFile so the user can see the file they just uploaded
      setProgress(100);
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error.message || "An error occurred during upload.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleCopyLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink).then(
        () => {
          toast({
            title: "Link copied",
            description: "Share link has been copied to clipboard.",
          });
        },
        () => {
          toast({
            title: "Copy failed",
            description: "Failed to copy link to clipboard.",
            variant: "destructive",
          });
        }
      );
    }
  };

  return (
    <div className="rounded-lg border bg-card p-8 shadow-sm">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Upload File</h2>
          <p className="text-sm text-muted-foreground">
            Select a file to upload and share with others.
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:border-brandpurple-300 transition-colors">
          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            onChange={handleFileChange}
            disabled={uploading}
          />
          <label 
            htmlFor="file-upload" 
            className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-12 w-12 text-gray-400 mb-4"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="text-sm font-medium">
              {selectedFile ? selectedFile.name : "Click to select or drag and drop a file"}
            </p>
            {selectedFile && (
              <p className="text-xs text-muted-foreground mt-1">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            )}
          </label>
        </div>

        {uploading && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2 w-full" />
            <p className="text-xs text-muted-foreground">Uploading... {progress}%</p>
          </div>
        )}

        <Button 
          onClick={handleUpload} 
          disabled={!selectedFile || uploading}
          className="w-full bg-brandpurple-600 hover:bg-brandpurple-700"
        >
          {uploading ? "Uploading..." : "Upload File"}
        </Button>
        
        {shareLink && !uploading && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-medium">Share Link:</p>
              <div className="flex space-x-2">
                <input
                  type="text"
                  readOnly
                  value={shareLink}
                  className="flex-1 px-3 py-2 border rounded-md text-sm text-gray-700 bg-white"
                />
                <Button
                  onClick={handleCopyLink}
                  className="bg-brandpurple-600 hover:bg-brandpurple-700"
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
