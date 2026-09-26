"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function CrossfadeImage({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  const [shown, setShown] = useState(src);
  const [readySrc, setReadySrc] = useState<string | null>(null);
  const incoming = src === shown ? null : src;
  const ready = incoming !== null && readySrc === incoming;

  useEffect(() => {
    if (!incoming || !ready) return;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 360;
    const timer = window.setTimeout(() => {
      setShown(incoming);
    }, duration);
    return () => window.clearTimeout(timer);
  }, [incoming, ready]);

  return <>
    <Image src={shown} alt={alt} fill sizes={sizes}/>
    {incoming && <Image key={incoming} src={incoming} alt="" aria-hidden="true" fill sizes={sizes} className={`crossfade-next ${ready ? "ready" : ""}`} onLoad={() => requestAnimationFrame(() => setReadySrc(incoming))}/>}
  </>;
}
