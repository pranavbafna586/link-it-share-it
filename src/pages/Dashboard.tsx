
import { Navbar } from "@/components/Navbar";
import { FileDashboard } from "@/components/FileDashboard";

export default function Dashboard() {
  // In a real app, you would check for authentication here
  // and redirect to login if not authenticated
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1">
        <FileDashboard />
      </div>
    </div>
  );
}
