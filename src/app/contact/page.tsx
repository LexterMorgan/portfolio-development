import { permanentRedirect } from "next/navigation";

/**
 * Contact is part of About. Permanent redirect so old links resolve.
 * Note: browsers drop URL fragments across 3xx, so the #contact hash
 * is handled by the anchor on /about (id="contact").
 */
export default function ContactRedirect() {
  permanentRedirect("/about");
}
