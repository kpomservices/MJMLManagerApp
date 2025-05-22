
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  thumbnailUrl?: string;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export function TemplateCard({ id, title, description, updatedAt, thumbnailUrl, onDelete, onDuplicate }: TemplateCardProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDuplicting, setIsDuplicting] = useState(false);
  //console.log(id)

  const handleEdit = () => {
    //console.log(id)
    navigate(`/editor/${id}`);
  };

  const handleCopy = () => {
    setIsDuplicting(true);
    setTimeout(() => {
      onDuplicate(id);
      setIsDuplicting(false);
      toast({
        title: "Template copied",
        description: "Template has been duplicated successfully.",
      });
    }, 500);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(id);
      setIsDeleting(false);
      toast({
        title: "Template deleted",
        description: "Template has been removed successfully.",
      });
    }, 500);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video relative bg-gray-100">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No Preview</span>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm truncate">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-xs text-gray-500">Last updated: {updatedAt}</p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="outline" size="sm" disabled={isDuplicting} onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <div className="flex gap-2">
          {/* <Button variant="outline" size="sm" disabled={isDuplicting} onClick={handleCopy}>
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy</span>
          </Button> */}
          {/* <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button> */}
        </div>
      </CardFooter>
    </Card>
  );
}
