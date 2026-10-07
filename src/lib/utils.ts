import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function formatBookingSubject(
  clientName: string,
  checkInDate: string,
  checkOutDate: string
): { subject: string; referenceId: string } {
  const now = new Date();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const timePart = now.getTime().toString(36).toUpperCase().slice(-4);
  const referenceId = `LAS-${timePart}${randomSuffix}`;

  const cleanName = clientName.trim() || "Guest";

  if (checkInDate && checkOutDate) {
    const [inY, inM, inD] = checkInDate.split("-").map(Number);
    const [outY, outM, outD] = checkOutDate.split("-").map(Number);

    const inMonthName = MONTHS[(inM || 1) - 1] || "";
    const outMonthName = MONTHS[(outM || 1) - 1] || "";

    let dateRangeStr = "";
    if (inY === outY && inM === outM) {
      dateRangeStr = `${inD}-${outD} ${inMonthName} ${inY}`;
    } else if (inY === outY) {
      dateRangeStr = `${inD} ${inMonthName} - ${outD} ${outMonthName} ${outY}`;
    } else {
      dateRangeStr = `${inD} ${inMonthName} ${inY} - ${outD} ${outMonthName} ${outY}`;
    }

    return {
      subject: `${cleanName} and ${dateRangeStr}`,
      referenceId,
    };
  }

  return {
    subject: `${cleanName} and ${checkInDate || "Booking Inquiry"}`,
    referenceId,
  };
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

