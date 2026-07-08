/**
 * Team / values / cities data — STRUCTURE ONLY.
 * All human-readable text lives in messages.team.* and messages.common.cities.*
 */

export const TEAM_MEMBERS = [
  { id: "alex", initials: "AP" },
] as const;

export const VALUE_KEYS = ["speed", "precision", "transparency", "performance"] as const;

export const CITIES = [
  { id: "geneva", coords: "46.2044° N, 6.1432° E" },
  { id: "lausanne", coords: "46.5197° N, 6.6323° E" },
  { id: "zurich", coords: "47.3769° N, 8.5417° E" },
] as const;
