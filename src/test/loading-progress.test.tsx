import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LoadingProvider, useLoading } from "@/portfolio/context/LoadingProvider";

vi.mock("@/portfolio/components/Loading", () => ({
  default: ({ percent }: { percent: number }) => <output data-testid="progress">{percent}</output>,
}));

let updateProgress: ((percent: number) => void) | undefined;
function ProgressControl() {
  updateProgress = useLoading().setLoading;
  return null;
}

afterEach(() => {
  cleanup();
  updateProgress = undefined;
  vi.useRealTimers();
});

describe("Portfolio loading progress", () => {
  it("keeps the completed fallback at 100 when model progress arrives late", () => {
    vi.useFakeTimers();
    render(<LoadingProvider><ProgressControl /></LoadingProvider>);
    act(() => vi.advanceTimersByTime(12000));
    expect(screen.getByTestId("progress").textContent).toBe("100");
    act(() => updateProgress?.(26));
    expect(screen.getByTestId("progress").textContent).toBe("100");
  });

  it("only accepts finite, increasing progress within zero to 100", () => {
    render(<LoadingProvider><ProgressControl /></LoadingProvider>);
    act(() => updateProgress?.(-5));
    expect(screen.getByTestId("progress").textContent).toBe("0");
    act(() => updateProgress?.(42));
    act(() => updateProgress?.(Number.NaN));
    act(() => updateProgress?.(20));
    expect(screen.getByTestId("progress").textContent).toBe("42");
    act(() => updateProgress?.(125));
    expect(screen.getByTestId("progress").textContent).toBe("100");
  });
});