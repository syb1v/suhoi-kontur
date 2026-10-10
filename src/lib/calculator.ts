export type Drainage = "free" | "well" | "pump";
export const calculateEstimate = (length: number, drainage: Drainage) => {
  const surcharge = { free: 0, well: 35000, pump: 65000 }[drainage];
  const total = Math.max(200000, length * 3500 + surcharge);
  return { total, min: Math.round(total * .9), max: Math.round(total * 1.1) };
};
