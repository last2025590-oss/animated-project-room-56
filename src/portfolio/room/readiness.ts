export function roomIsReady(room: boolean, character: boolean): boolean {
  return room && character;
}

export function roomLoadingProgress(room: number, character: boolean): number {
  return Math.min(character ? 100 : 95, Math.round(Math.min(100, room) * 0.8 + (character ? 20 : 0)));
}