/** Set to false to hide PasaEGEL in Experience and Selected Work. */
export const showPasaEGEL = false;

const PASAEGEL_COMPANY = "PasaEGEL";
const PASAEGEL_PROJECT_ID = "pasaegel";

export function filterExperience<T extends { company: string }>(items: T[]) {
  if (showPasaEGEL) return items;
  return items.filter((item) => item.company !== PASAEGEL_COMPANY);
}

export function filterProjects<T extends { id: string }>(items: T[]) {
  if (showPasaEGEL) return items;
  return items.filter((item) => item.id !== PASAEGEL_PROJECT_ID);
}
