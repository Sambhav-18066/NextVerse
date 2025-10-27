import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { BookText } from "lucide-react";

interface ModelViewerProps {
  courseId: string;
}

const models: Record<string, { title: string; embedId: string }> = {
  'quantum-computing': {
    title: "Quantum Computer",
    embedId: "1e421589146549a882a03d015c7e47f2"
  },
  'future-of-ai': {
    title: "AI Robotic Brain",
    embedId: "2b05b82b3c2949f2b88b39b16541584d"
  }
};

export function ModelViewer({ courseId }: ModelViewerProps) {
  const model = models[courseId] || models['future-of-ai'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><BookText className="text-primary"/> 3D Model</CardTitle>
        <CardDescription>
          Explore a 3D model related to the course content. Interact with it by dragging, zooming, and rotating.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-square w-full bg-muted rounded-lg overflow-hidden">
          <iframe
            title={model.title}
            frameBorder="0"
            allowFullScreen
            allow="autoplay; fullscreen; xr-spatial-tracking"
            src={`https://sketchfab.com/models/${model.embedId}/embed?autostart=1&ui_theme=dark`}
            className="w-full h-full"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
}
