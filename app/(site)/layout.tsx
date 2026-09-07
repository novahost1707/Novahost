import { SiteChrome } from "@/components/layout/SiteChrome";

/** Alles unter (site) traegt den Novahost-Auftritt. /demo bewusst nicht. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
