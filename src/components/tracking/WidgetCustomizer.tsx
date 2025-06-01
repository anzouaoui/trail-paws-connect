
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronDown } from "lucide-react";
import { Widget } from "@/types/tracking";

interface WidgetCustomizerProps {
  widgets: Widget[];
  isCustomizingWidgets: boolean;
  onToggleCustomization: () => void;
  onMoveWidget: (id: string, direction: 'up' | 'down') => void;
  onToggleWidgetVisibility: (id: string) => void;
}

const WidgetCustomizer: React.FC<WidgetCustomizerProps> = ({
  widgets,
  isCustomizingWidgets,
  onToggleCustomization,
  onMoveWidget,
  onToggleWidgetVisibility
}) => {
  if (!isCustomizingWidgets) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <Card className="rounded-2xl border-forest border-dashed shadow-sm bg-forest/5">
        <CardHeader className="p-3">
          <CardTitle className="text-sm flex items-center justify-between">
            <span>Personnaliser le Tableau de Bord</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 rounded-lg"
              onClick={onToggleCustomization}
            >
              Terminé
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <p className="text-xs text-muted-foreground mb-3">Glissez et arrangez les widgets ou basculez la visibilité</p>
          <div className="space-y-2">
            {widgets.map(widget => (
              <div key={widget.id} 
                className="flex items-center justify-between p-2 bg-background rounded-xl border"
              >
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-muted rounded-md">{widget.icon}</span>
                  <span>{widget.title}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => onMoveWidget(widget.id, 'up')}
                    disabled={widget.position === 0}
                  >
                    <ChevronDown className="h-4 w-4 rotate-180" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => onMoveWidget(widget.id, 'down')}
                    disabled={widget.position === widgets.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Switch 
                    checked={widget.visible}
                    onCheckedChange={() => onToggleWidgetVisibility(widget.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WidgetCustomizer;
