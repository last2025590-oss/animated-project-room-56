import { describe, expect, it } from "vitest";
import { roomIsReady, roomLoadingProgress } from "@/portfolio/room/readiness";
import { wallLayout } from "@/portfolio/room/wallLayout";

describe("Room readiness", () => {
  it("keeps the loader until the animated person and room are both ready", () => {
    expect(roomIsReady(true, false)).toBe(false);
    expect(roomIsReady(false, true)).toBe(false);
    expect(roomIsReady(true, true)).toBe(true);
    expect(roomLoadingProgress(100, false)).toBe(80);
    expect(roomLoadingProgress(100, true)).toBe(100);
  });
  it("fits every section display within the side wall instead of extending beyond it", () => {
    for (const count of [4, 5, 8, 17]) {
      const layout = wallLayout(count);
      for (const position of layout.positions) {
        expect(position.z + layout.cardW / 2).toBeLessThanOrEqual(0.48 + 0.00001);
        expect(position.z - layout.cardW / 2).toBeGreaterThanOrEqual(-0.44 - 0.00001);
        expect(position.y - layout.cardH / 2).toBeGreaterThan(0.45);
        expect(position.x).toBe(-0.245);
      }
      expect(layout.length).toBeLessThanOrEqual(6);
    }
  });
});