import { useEffect, useState } from "react";

const STORAGE_KEY = "jobTrackerProofArtifacts";

const URL_REGEX = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

export function isValidUrl(value: string): boolean {
  if (!value || typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  try {
    new URL(trimmed);
    return URL_REGEX.test(trimmed);
  } catch {
    return false;
  }
}

export interface ProofArtifacts {
  lovableLink: string;
  githubLink: string;
  deployedUrl: string;
}

const defaultArtifacts: ProofArtifacts = {
  lovableLink: "",
  githubLink: "",
  deployedUrl: "",
};

export function useProofArtifacts() {
  const [artifacts, setArtifacts] = useState<ProofArtifacts>(defaultArtifacts);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<ProofArtifacts>;
      if (parsed && typeof parsed === "object") {
        setArtifacts({
          lovableLink: typeof parsed.lovableLink === "string" ? parsed.lovableLink : "",
          githubLink: typeof parsed.githubLink === "string" ? parsed.githubLink : "",
          deployedUrl: typeof parsed.deployedUrl === "string" ? parsed.deployedUrl : "",
        });
      }
    } catch {
      // ignore malformed storage
    }
  }, []);

  const setArtifact = (key: keyof ProofArtifacts, value: string) => {
    setArtifacts((prev) => {
      const next = { ...prev, [key]: value };
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
      }
      return next;
    });
  };

  const lovableValid = artifacts.lovableLink.trim() !== "" && isValidUrl(artifacts.lovableLink);
  const githubValid = artifacts.githubLink.trim() !== "" && isValidUrl(artifacts.githubLink);
  const deployedValid = artifacts.deployedUrl.trim() !== "" && isValidUrl(artifacts.deployedUrl);
  const allLinksValid = lovableValid && githubValid && deployedValid;

  return {
    artifacts,
    setArtifact,
    lovableValid,
    githubValid,
    deployedValid,
    allLinksValid,
  };
}
