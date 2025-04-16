
import { FileUploader } from "./FileUploader";
import { FileList } from "./FileList";

export function FileDashboard() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Files</h1>
        <p className="text-muted-foreground mt-1">
          Upload, manage, and share your files easily.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-[400px_1fr]">
        <FileUploader />
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Recent Files</h2>
          </div>
          <FileList />
        </div>
      </div>
    </div>
  );
}
