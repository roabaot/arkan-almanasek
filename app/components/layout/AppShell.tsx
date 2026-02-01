"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingOverlay from "./LoadingOverlay";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Always hide scroll on mount
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    // Wait for all resources to load
    const handleLoad = () => {
      // setTimeout(() => setLoading(false), 1500);
      setTimeout(() => setLoading(false), 550);
    };
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    // Only enable scroll when not loading and drawer is closed
    if (!loading) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [loading]);

  return (
    <div className="relative">
      {/* <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <Header onMenuClick={() => setDrawerOpen(true)} /> */}
      <AnimatePresence mode="wait">
        {loading ? <LoadingOverlay key="loader" /> : children}
      </AnimatePresence>
    </div>
  );
}
