"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  isInView?: boolean;
}

export default function AnimatedCounter({
  end,
  duration = 1800,
  prefix = "",
  suffix = "",
  isInView: propIsInView,
}: AnimatedCounterProps) {
  const ref = useRef(null);

  const localIsInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  const isInView = propIsInView !== undefined ? propIsInView : localIsInView;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;

    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}