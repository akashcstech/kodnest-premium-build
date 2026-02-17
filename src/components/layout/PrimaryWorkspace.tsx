import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PrimaryWorkspace = () => {
  return (
    <section className="flex flex-col gap-3">
      {/* Typography showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Typography System</CardTitle>
          <CardDescription>Serif headings with sans-serif body text.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <h1 className="font-heading text-5xl font-bold text-foreground">Heading 1</h1>
          <h2 className="font-heading text-4xl font-semibold text-foreground">Heading 2</h2>
          <h3 className="font-heading text-3xl font-semibold text-foreground">Heading 3</h3>
          <h4 className="font-heading text-2xl font-medium text-foreground">Heading 4</h4>
          <p className="text-base text-foreground prose-width">
            Body text at 16px with 1.7 line-height, constrained to 720px for comfortable reading. 
            This is what content paragraphs should look like across the entire system.
          </p>
          <p className="text-sm text-muted-foreground">
            Muted secondary text for supporting information.
          </p>
        </CardContent>
      </Card>

      {/* Color system */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Color Palette</CardTitle>
          <CardDescription>Four core colors. No gradients, no noise.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded-md bg-background border" />
              <span className="text-xs text-muted-foreground">Background</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded-md bg-foreground" />
              <span className="text-xs text-muted-foreground">Foreground</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded-md bg-primary" />
              <span className="text-xs text-muted-foreground">Primary</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded-md bg-secondary" />
              <span className="text-xs text-muted-foreground">Secondary</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded-md bg-success" />
              <span className="text-xs text-muted-foreground">Success</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded-md bg-warning" />
              <span className="text-xs text-muted-foreground">Warning</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Buttons</CardTitle>
          <CardDescription>Primary solid, secondary outlined, consistent radius.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap items-center">
            <Button>Primary Action</Button>
            <Button variant="outline">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="success">Success</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Badges</CardTitle>
          <CardDescription>Status indicators with semantic meaning.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap items-center">
            <Badge>Default</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="muted">Muted</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Inputs */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Form Inputs</CardTitle>
          <CardDescription>Clean borders, clear focus states, no heavy shadows.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 max-w-[360px]">
          <Input placeholder="Default input" />
          <Input placeholder="Disabled input" disabled />
          <div className="flex gap-2">
            <Input placeholder="With button" />
            <Button>Submit</Button>
          </div>
        </CardContent>
      </Card>

      {/* Empty state */}
      <Card>
        <CardContent className="p-5 flex flex-col items-center text-center">
          <p className="text-muted-foreground text-sm">No items yet.</p>
          <p className="text-muted-foreground text-xs mt-1">Create your first item to get started.</p>
          <Button variant="outline" size="sm" className="mt-3">
            Create Item
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default PrimaryWorkspace;
