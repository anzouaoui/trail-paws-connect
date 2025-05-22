
import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsSectionProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const SettingsSection = ({
  icon,
  title,
  description,
  onClick,
  className,
  children,
}: SettingsSectionProps) => {
  return (
    <div
      className={cn(
        "p-4 bg-white rounded-lg shadow-sm mb-3 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="mr-3 text-forest bg-forest/10 p-2 rounded-full">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-base">{title}</h3>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
        {!children && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
      </div>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
};

export default SettingsSection;
