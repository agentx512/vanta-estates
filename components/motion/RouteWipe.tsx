"use client";

import { usePathname } from "next/navigation";

export function RouteWipe() {
  const pathname = usePathname();
  return <span key={pathname} className="route-wipe" aria-hidden="true"/>;
}
