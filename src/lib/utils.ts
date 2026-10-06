import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueSubject(
  formType: string,
  identifier?: string,
  extraDetails?: string
): { subject: string; referenceId: string; timestamp: string } {
  const now = new Date();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const timePart = now.getTime().toString(36).toUpperCase().slice(-4);
  const referenceId = `LAS-${timePart}${randomSuffix}`;

  const timestamp = now.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const cleanIdentifier = identifier?.trim() ? ` - ${identifier.trim()}` : "";
  const cleanDetails = extraDetails?.trim() ? ` (${extraDetails.trim()})` : "";

  const subject = `${formType}${cleanIdentifier}${cleanDetails} [Ref #${referenceId} | ${timestamp}]`;

  return { subject, referenceId, timestamp };
}

