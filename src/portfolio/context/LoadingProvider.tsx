// @ts-nocheck -- imported as-is from the original portfolio repo
import {
  createContext,
  useCallback,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoadingProgress] = useState(0);
  // Late model progress must not undo the completed fallback and trap the page.
  const setLoading = useCallback((percent: number) => {
    if (!Number.isFinite(percent)) return;
    setLoadingProgress(current => Math.max(current, Math.min(100, Math.max(0, percent))));
  }, []);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };
  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(100), 12000);
    return () => window.clearTimeout(timeout);
  }, [setLoading]);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
