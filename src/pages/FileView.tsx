
import { Navbar } from "@/components/Navbar";
import { FileViewer } from "@/components/FileViewer";

export default function FileView() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1">
        <FileViewer />
      </div>
    </div>
  );
}
