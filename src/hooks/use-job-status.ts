import { useEffect, useState } from "react";

export type JobStatus = "Not Applied" | "Applied" | "Rejected" | "Selected";

const STORAGE_KEY = "jobTrackerStatus";
const STATUS_UPDATES_KEY = "jobTrackerStatusUpdates";

export interface StatusUpdate {
  jobId: string;
  title: string;
  company: string;
  status: JobStatus;
  dateChanged: string;
}

export function useJobStatus() {
  const [statuses, setStatuses] = useState<Record<string, JobStatus>>({});
  const [statusUpdates, setStatusUpdates] = useState<StatusUpdate[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed === "object" && parsed !== null) {
          setStatuses(parsed);
        }
      }
    } catch {
      // ignore localStorage errors
    }

    try {
      const updatesRaw = window.localStorage.getItem(STATUS_UPDATES_KEY);
      if (updatesRaw) {
        const parsed = JSON.parse(updatesRaw);
        if (Array.isArray(parsed)) {
          setStatusUpdates(parsed);
        }
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  const getStatus = (jobId: string): JobStatus => {
    return statuses[jobId] || "Not Applied";
  };

  const setStatus = (jobId: string, status: JobStatus, jobTitle: string, jobCompany: string) => {
    const previousStatus = statuses[jobId] || "Not Applied";
    
    setStatuses((current) => {
      const next = { ...current, [jobId]: status };
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore persistence failures
        }
      }
      return next;
    });

    // Only track updates for non-default statuses and when status actually changes
    if (status !== "Not Applied" && previousStatus !== status) {
      const update: StatusUpdate = {
        jobId,
        title: jobTitle,
        company: jobCompany,
        status,
        dateChanged: new Date().toISOString(),
      };

      setStatusUpdates((current) => {
        const next = [update, ...current].slice(0, 50); // Keep last 50 updates
        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem(STATUS_UPDATES_KEY, JSON.stringify(next));
          } catch {
            // ignore persistence failures
          }
        }
        return next;
      });
    }
  };

  return {
    getStatus,
    setStatus,
    statusUpdates,
  };
}
