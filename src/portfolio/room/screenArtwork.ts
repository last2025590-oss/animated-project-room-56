import type { SectionScreen } from "./sectionScreens";

export const screenImages = new Map<string, HTMLImageElement>();

export function drawScreen(canvas: HTMLCanvasElement, card: SectionScreen, section: string, index: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const styles = getComputedStyle(document.documentElement);
  const token = (name: string) => styles.getPropertyValue(name).trim();
  const bg = token("--screen-background"), fg = token("--screen-foreground"), accent = token("--screen-accent"), muted = token("--screen-muted");
  const W = canvas.width, H = canvas.height, pad = 44;
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = accent; ctx.fillRect(0, 0, W, 9);
  ctx.fillStyle = muted; ctx.font = "500 23px Arial";
  ctx.fillText(`${String(index + 1).padStart(2, "0")} / ${section.toUpperCase()}`, pad, 52);
  const image = card.image ? screenImages.get(card.image) : undefined;
  if (image) {
    const icon = section === "skills";
    const areaH = H - 190;
    const scale = Math.min((icon ? 145 : W - 2 * pad) / image.naturalWidth, (icon ? 145 : areaH) / image.naturalHeight);
    const w = image.naturalWidth * scale, h = image.naturalHeight * scale;
    ctx.drawImage(image, (W - w) / 2, 76 + (areaH - h) / 2, w, h);
  }
  ctx.fillStyle = fg; ctx.font = "600 40px Arial";
  const lines = (text: string, y: number, size: number, maxWidth: number, maxLines = 8) => {
    ctx.font = `${size === 40 ? 600 : 400} ${size}px Arial`;
    let line = "", row = 0;
    for (const paragraph of text.split("\n")) {
      for (const word of paragraph.split(" ")) {
        const next = line ? `${line} ${word}` : word;
        if (ctx.measureText(next).width > maxWidth && line) {
          if (row < maxLines) ctx.fillText(line, pad, y + row * size * 1.35);
          row++; line = word;
        } else line = next;
      }
      if (row < maxLines) ctx.fillText(line, pad, y + row * size * 1.35);
      row++; line = "";
    }
    return y + row * size * 1.35;
  };
  const titleY = image ? H - 85 : 130;
  const bottom = lines(card.title, titleY, image ? 30 : 40, W - pad * 2, 2);
  if (card.text) {
    ctx.fillStyle = muted;
    lines(card.text, bottom + 30, section === "contact" ? 32 : 30, W - pad * 2);
  }
  if (card.url) { ctx.fillStyle = accent; ctx.font = "32px Arial"; ctx.fillText("↗", W - 68, H - 32); }
}