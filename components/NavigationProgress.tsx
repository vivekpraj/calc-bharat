"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Top progress bar that:
 * 1. Starts IMMEDIATELY when any internal link is clicked (feels instant)
 * 2. Completes + fades out when the new pathname is detected (navigation done)
 */
export default function NavigationProgress() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const navigating = useRef(false);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const start = () => {
    if (navigating.current) return;
    navigating.current = true;
    clear();
    setVisible(true);
    setWidth(8);
    timers.current.push(setTimeout(() => setWidth(30), 80));
    timers.current.push(setTimeout(() => setWidth(55), 300));
    timers.current.push(setTimeout(() => setWidth(72), 700));
    timers.current.push(setTimeout(() => setWidth(85), 1400));
  };

  const finish = () => {
    clear();
    setWidth(100);
    timers.current.push(
      setTimeout(() => {
        setVisible(false);
        setWidth(0);
        navigating.current = false;
      }, 380)
    );
  };

  // Fire on link click (before route change — feels instant to user)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (
        anchor &&
        anchor.href &&
        anchor.hostname === window.location.hostname &&
        !anchor.href.includes("#") &&
        anchor.href !== window.location.href
      ) {
        start();
      }
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Complete when pathname actually changes
  useEffect(() => {
    if (navigating.current) {
      finish();
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup on unmount
  useEffect(() => () => clear(), []);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full z-[9999] pointer-events-none"
      aria-hidden="true"
    >
      {/* Progress bar */}
      <div
        className="h-[3px] bg-gradient-to-r from-brand-500 via-accent-400 to-accent-500 rounded-r-full shadow-[0_0_8px_rgba(255,116,32,0.6)]"
        style={{
          width: `${width}%`,
          transition: width === 100
            ? "width 0.3s ease-out"
            : "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </div>
  );
}
