import { useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { jobs } from "@/data/jobs";
import { useJobPreferences } from "@/hooks/use-job-preferences";

const Settings = () => {
  const { preferences, savePreferences } = useJobPreferences();

  const ANY_EXPERIENCE_VALUE = "any";

  const [roleKeywordsInput, setRoleKeywordsInput] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [preferredLocations, setPreferredLocations] = useState<string[]>([]);
  const [preferredModes, setPreferredModes] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<string>(ANY_EXPERIENCE_VALUE);
  const [minMatchScore, setMinMatchScore] = useState<number>(40);

  const availableLocations = useMemo(
    () => Array.from(new Set(jobs.map((job) => job.location))).sort(),
    [],
  );

  const availableExperiences = useMemo(
    () => Array.from(new Set(jobs.map((job) => job.experience))).sort(),
    [],
  );

  useEffect(() => {
    setRoleKeywordsInput(preferences.roleKeywords.join(", "));
    setSkillsInput(preferences.skills.join(", "));
    setPreferredLocations(preferences.preferredLocations);
    setPreferredModes(preferences.preferredModes);
    setExperienceLevel(preferences.experienceLevel ?? ANY_EXPERIENCE_VALUE);
    setMinMatchScore(preferences.minMatchScore);
  }, [preferences]);

  const toggleLocation = (value: string, checked: boolean | string) => {
    setPreferredLocations((current) =>
      checked ? Array.from(new Set([...current, value])) : current.filter((item) => item !== value),
    );
  };

  const toggleMode = (value: string, checked: boolean | string) => {
    setPreferredModes((current) =>
      checked ? Array.from(new Set([...current, value])) : current.filter((item) => item !== value),
    );
  };

  const parseCommaSeparated = (value: string) =>
    value
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);

  const handleSave = () => {
    const next = {
      roleKeywords: parseCommaSeparated(roleKeywordsInput),
      preferredLocations,
      preferredModes: preferredModes as typeof preferences.preferredModes,
      experienceLevel: experienceLevel === ANY_EXPERIENCE_VALUE ? null : experienceLevel,
      skills: parseCommaSeparated(skillsInput),
      minMatchScore,
    };
    savePreferences(next);
  };

  return (
    <section className="flex flex-1 flex-col gap-8">
      <header className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          Tracking Preferences
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          Define the kind of roles you care about. These preferences drive the match score you see on the dashboard.
        </p>
      </header>

      <form
        className="grid gap-6 rounded-xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur-sm md:grid-cols-2 md:gap-8"
        onSubmit={(event) => {
          event.preventDefault();
          handleSave();
        }}
      >
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="role-keywords">Role keywords</Label>
          <Input
            id="role-keywords"
            placeholder="e.g. SDE Intern, Frontend Engineer, Data Analyst"
            autoComplete="off"
            value={roleKeywordsInput}
            onChange={(event) => setRoleKeywordsInput(event.target.value)}
          />
          <p className="text-xs text-slate-500">
            Comma-separated. We look for these phrases in job titles and descriptions.
          </p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Preferred locations</Label>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {availableLocations.map((loc) => (
              <label key={loc} className="flex items-center gap-2 rounded-md border border-slate-200 bg-white/60 px-3 py-1.5 text-sm text-slate-800">
                <Checkbox
                  checked={preferredLocations.includes(loc)}
                  onCheckedChange={(checked) => toggleLocation(loc, checked)}
                />
                <span>{loc}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Mode</Label>
          <div className="space-y-2 rounded-md border border-slate-200 bg-white/60 p-3 text-sm text-slate-800">
            {["Remote", "Hybrid", "Onsite"].map((mode) => (
              <label key={mode} className="flex items-center gap-2">
                <Checkbox
                  checked={preferredModes.includes(mode)}
                  onCheckedChange={(checked) => toggleMode(mode, checked)}
                />
                <span>{mode}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience-level">Experience level</Label>
          <Select value={experienceLevel} onValueChange={setExperienceLevel}>
            <SelectTrigger id="experience-level">
              <SelectValue placeholder="Any experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ANY_EXPERIENCE_VALUE}>Any experience</SelectItem>
              {availableExperiences.map((exp) => (
                <SelectItem key={exp} value={exp}>
                  {exp}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="skills">Skills</Label>
          <Input
            id="skills"
            placeholder="e.g. React, Java, SQL, Data Structures"
            autoComplete="off"
            value={skillsInput}
            onChange={(event) => setSkillsInput(event.target.value)}
          />
          <p className="text-xs text-slate-500">
            Comma-separated skills. We look for overlaps with the skills listed on each role.
          </p>
        </div>

        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <Label>Minimum match score</Label>
            <span className="text-sm font-medium text-slate-800">{minMatchScore}</span>
          </div>
          <Slider
            value={[minMatchScore]}
            min={0}
            max={100}
            step={5}
            onValueChange={([value]) => setMinMatchScore(value)}
          />
          <p className="text-xs text-slate-500">
            Jobs below this score can be hidden on the dashboard with the &quot;Show only jobs above my threshold&quot;
            toggle.
          </p>
        </div>

        <div className="md:col-span-2 flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            className="text-sm text-slate-700 hover:bg-slate-100"
            onClick={() => {
              setRoleKeywordsInput("");
              setSkillsInput("");
              setPreferredLocations([]);
              setPreferredModes([]);
              setExperienceLevel(ANY_EXPERIENCE_VALUE);
              setMinMatchScore(40);
            }}
          >
            Reset form
          </Button>
          <Button
            type="submit"
            className="bg-[#8B0000] text-[#F7F6F3] hover:bg-[#8B0000]/90"
          >
            Save preferences
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Settings;

