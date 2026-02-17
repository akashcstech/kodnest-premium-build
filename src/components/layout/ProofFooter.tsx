import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface ProofItem {
  id: string;
  label: string;
}

const defaultItems: ProofItem[] = [
  { id: "ui", label: "UI Built" },
  { id: "logic", label: "Logic Working" },
  { id: "test", label: "Test Passed" },
  { id: "deployed", label: "Deployed" },
];

const ProofFooter = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <footer className="border-t px-3 py-3">
      <div className="flex items-center gap-5 flex-wrap">
        {defaultItems.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-1 text-sm text-foreground cursor-pointer select-none"
          >
            <Checkbox
              checked={!!checked[item.id]}
              onCheckedChange={() => toggle(item.id)}
            />
            {item.label}
          </label>
        ))}
      </div>
    </footer>
  );
};

export default ProofFooter;
