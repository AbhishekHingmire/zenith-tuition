import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const EditButton = ({ onClick, className, disabled }: ActionButtonProps) => (
  <Button
    size="sm"
    variant="outline"
    onClick={onClick}
    disabled={disabled}
    className={cn("hover:bg-accent", className)}
  >
    <Edit className="w-4 h-4" />
  </Button>
);

export const DeleteButton = ({ onClick, className, disabled }: ActionButtonProps) => (
  <Button
    size="sm"
    variant="outline"
    onClick={onClick}
    disabled={disabled}
    className={cn("text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20", className)}
  >
    <Trash2 className="w-4 h-4" />
  </Button>
);

export const ViewButton = ({ onClick, className, disabled }: ActionButtonProps) => (
  <Button
    size="sm"
    variant="outline"
    onClick={onClick}
    disabled={disabled}
    className={cn("hover:bg-accent", className)}
  >
    <Eye className="w-4 h-4" />
  </Button>
);
