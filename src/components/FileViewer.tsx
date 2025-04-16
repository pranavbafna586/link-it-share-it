
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FileDetails {
  id: string;
  name: string;
  type: string;
  size: number;
  created_at: string;
  user_id: string;
  storage_path: string;
  downloads: number;
}

export function FileViewer() {
  const { fileId } = useParams<{ fileId: string }>();
  const [file, setFile] = useState<FileDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [ownerName, setOwnerName] = useState<string | null>(null);
  
  useEffect(() => {
    if (fileId) {
      fetchFileDetails();
    }
  }, [fileId]);
  
  const fetchFileDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch file details using share_id
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .eq('share_id', fileId)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setFile(data);
        
        // Get owner's name from the profiles table
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', data.user_id)
          .single();
        
        if (profileData) {
          setOwnerName(profileData.full_name);
        }
      }
    } catch (error: any) {
      console.error("Error fetching file:", error);
      toast({
        title: "Error",
        description: "Failed to load file details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    else if (bytes < 1024 * 1024 * 1024)
      return (bytes / 1024 / 1024).toFixed(2) + " MB";
    else return (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  const getFileIcon = (type: string) => {
    if (type.includes("image")) {
      return (
        <div className="mx-auto w-24 h-24 bg-brandpurple-100 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-12 w-12 text-brandpurple-600"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        </div>
      );
    } else if (type.includes("pdf")) {
      return (
        <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-12 w-12 text-red-500"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
      );
    } else if (type.includes("word") || type.includes("document")) {
      return (
        <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-12 w-12 text-blue-500"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
      );
    } else if (type.includes("spreadsheet") || type.includes("excel")) {
      return (
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-12 w-12 text-green-500"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-12 w-12 text-gray-600"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
      );
    }
  };
  
  const handleDownload = async () => {
    if (!file) return;
    
    try {
      setDownloading(true);
      
      // Get the file URL
      const { data, error } = await supabase.storage
        .from('file_uploads')
        .createSignedUrl(file.storage_path, 60); // URL expires in 60 seconds
      
      if (error) throw error;
      
      if (data?.signedUrl) {
        // Create a temporary link and trigger the download
        const a = document.createElement('a');
        a.href = data.signedUrl;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Update download count
        await supabase
          .from('files')
          .update({ 
            downloads: (file.downloads || 0) + 1,
            last_downloaded_at: new Date().toISOString()
          })
          .eq('id', file.id);
        
        toast({
          title: "Download started",
          description: `${file.name} will download shortly.`,
        });
      }
    } catch (error: any) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: error.message || "Failed to download the file.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container py-12">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full animate-pulse"></div>
            <CardTitle className="mt-4 h-6 bg-gray-200 rounded animate-pulse"></CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!file) {
    return (
      <div className="container py-12">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">File Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              The file you're looking for doesn't exist or has been removed.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container py-12">
      <Card className="max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center pb-0">
          {getFileIcon(file.type)}
          <CardTitle className="mt-4">{file.name}</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">Size:</div>
            <div className="text-right font-medium">{formatBytes(file.size)}</div>
            
            <div className="text-muted-foreground">Type:</div>
            <div className="text-right font-medium truncate">
              {file.type.split("/")[1]}
            </div>
            
            <div className="text-muted-foreground">Uploaded:</div>
            <div className="text-right font-medium">{formatDate(file.created_at)}</div>
            
            <div className="text-muted-foreground">Shared by:</div>
            <div className="text-right font-medium">{ownerName || "Anonymous"}</div>
            
            {file.downloads > 0 && (
              <>
                <div className="text-muted-foreground">Downloads:</div>
                <div className="text-right font-medium">{file.downloads}</div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            size="lg"
            onClick={handleDownload}
            disabled={downloading}
            className="bg-brandpurple-600 hover:bg-brandpurple-700 w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 mr-2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {downloading ? "Starting Download..." : "Download File"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
