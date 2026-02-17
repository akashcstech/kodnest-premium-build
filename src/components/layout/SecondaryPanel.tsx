import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, ExternalLink, CheckCircle, AlertCircle, Camera } from "lucide-react";

interface SecondaryPanelProps {
  stepTitle: string;
  stepDescription: string;
  promptText: string;
}

const SecondaryPanel = ({ stepTitle, stepDescription, promptText }: SecondaryPanelProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(promptText);
  };

  return (
    <aside className="flex flex-col gap-3">
      <div>
        <h3 className="font-heading text-xl font-semibold text-foreground">{stepTitle}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{stepDescription}</p>
      </div>

      <Card>
        <CardContent className="p-2">
          <pre className="whitespace-pre-wrap text-sm text-foreground font-body leading-relaxed">
            {promptText}
          </pre>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-1">
        <Button variant="outline" size="sm" onClick={copyToClipboard}>
          <Copy className="mr-0.5 h-3.5 w-3.5" />
          Copy
        </Button>
        <Button variant="outline" size="sm">
          <ExternalLink className="mr-0.5 h-3.5 w-3.5" />
          Build in Lovable
        </Button>
        <Button variant="success" size="sm">
          <CheckCircle className="mr-0.5 h-3.5 w-3.5" />
          It Worked
        </Button>
        <Button variant="destructive" size="sm">
          <AlertCircle className="mr-0.5 h-3.5 w-3.5" />
          Error
        </Button>
        <Button variant="ghost" size="sm">
          <Camera className="mr-0.5 h-3.5 w-3.5" />
          Add Screenshot
        </Button>
      </div>
    </aside>
  );
};

export default SecondaryPanel;
