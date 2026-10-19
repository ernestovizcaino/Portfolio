// Hook for hiding items from Experience and Selected Work. Currently shows everything.

export function filterExperience<T extends { company: string }>(items: T[]) {
  return items;
}

export function filterProjects<T extends { id: string }>(items: T[]) {
  return items;
}
