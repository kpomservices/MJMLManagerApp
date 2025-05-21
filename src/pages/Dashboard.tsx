
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { TemplateCard } from "@/components/TemplateCard";
// import { getTemplates, deleteTemplate, Template } from "@/lib/templates";
import { getTemplates, deleteTemplate, copyTemplate, Template } from "@/lib/templates";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Fetch templates with a small delay to simulate loading
  //   setIsLoading(true);
  //   const timer = setTimeout(() => {
  //     setTemplates(getTemplates());
  //     setIsLoading(false);
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    setIsLoading(true);
  
    const timer = setTimeout(() => {
      // define async function inside the timer callback
      async function fetchAndSet() {
        try {
          const templates = await getTemplates();
          setTemplates(templates);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchAndSet();
    }, 500);
  
    return () => clearTimeout(timer);
  }, []);
  

  const handleDelete = (id: string) => {
    deleteTemplate(id);
    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  const handleDuplicate = async (id: string) => {
    await copyTemplate(id); // Wait for duplication to finish
    const refreshedTemplates = await getTemplates(); // Fetch the updated list
    setTemplates(refreshedTemplates); // Refresh UI
  };


  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex-1">
        <div className="p-4 h-16 border-b flex items-center justify-between">
          <div className="flex items-center">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold ml-4">MJML Templates</h1>
          </div>
          <Link to="/editor/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Template
            </Button>
          </Link>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-md"></div>
              ))}
            </div>
          ) : templates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  id={template.id}
                  title={template.title}
                  description={template.description}
                  updatedAt={new Date(template.updatedAt).toLocaleDateString()}
                  thumbnailUrl={template.thumbnailUrl}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <h2 className="text-2xl font-medium text-gray-600 mb-4">No templates yet</h2>
              <p className="text-gray-500 mb-6">Create your first MJML template to get started</p>
              <Link to="/editor/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Template
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
