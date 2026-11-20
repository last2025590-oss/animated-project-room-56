export const WALL_PAGE_SIZE = 6;

export function wallLayout(count: number, page = 0) {
  const pages = Math.max(1, Math.ceil(count / WALL_PAGE_SIZE));
  const current = Math.max(0, Math.min(page, pages - 1));
  const length = Math.min(WALL_PAGE_SIZE, count - current * WALL_PAGE_SIZE);
  const cols = Math.min(3, Math.max(1, length));
  const rows = Math.ceil(length / cols);
  const width = 0.92;
  const gap = 0.025;
  const cardW = (width - (cols - 1) * gap) / cols;
  const cardH = rows === 1 ? 0.26 : 0.235;
  return { pages, page: current, start: current * WALL_PAGE_SIZE, length, cols, rows, cardW, cardH, gap, width,
    positions: Array.from({ length }, (_, i) => ({ x: -0.245, y: 0.85 - Math.floor(i / cols) * (cardH + gap), z: 0.48 - cardW / 2 - (i % cols) * (cardW + gap) })) };
}