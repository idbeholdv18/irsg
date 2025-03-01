export function isValidName(name: string): boolean {
  return name.trim() !== "" && !/\s/.test(name);
}
