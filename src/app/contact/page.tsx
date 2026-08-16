"use client";

import { useEffect } from "react";

/**
 * Contact is part of About. Keep the route so old links still resolve,
 * including the #contact hash (server redirects drop fragments).
 */
export default function ContactRedirect() {
  useEffect(() => {
    window.location.replace("/about#contact");
  }, []);

  return null;
}
