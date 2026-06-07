/** Generates a cryptographically unique id string. */
export function generateId(): string {
  return crypto.randomUUID();
}
