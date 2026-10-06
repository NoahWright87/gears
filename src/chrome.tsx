import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Footer,
  Header,
  Link,
  Text,
  ToggleIcon,
  getThemeMode,
  initThemeMode,
  toggleThemeMode,
} from "@noahwright/design";
import "@noahwright/design/styles.css";
import "./chrome.css";

const HOME_URL = "https://noahwright.dev";

type SiteHeaderProps = {
  title: string;
  /** The sibling page to link to. */
  nav: { label: string; href: string };
};

function SiteHeader({ title, nav }: SiteHeaderProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(getThemeMode() === "dark");
  }, []);

  return (
    <Header
      left={<Link href={HOME_URL}>← noahwright.dev</Link>}
      center={<strong className="gears-title">{title}</strong>}
      right={
        <>
          <Link href={nav.href}>{nav.label}</Link>
          <ToggleIcon
            preset="moon-sun"
            isToggled={isDark}
            onChange={(toggled) => {
              toggleThemeMode();
              setIsDark(toggled);
            }}
          />
        </>
      }
    />
  );
}

function SiteFooter() {
  return (
    <Footer>
      <Text>
        Copyright © <Link href={HOME_URL}>Noah Wright</Link> {new Date().getFullYear()}
      </Text>
    </Footer>
  );
}

function mount(id: string, node: React.ReactNode) {
  const el = document.getElementById(id);
  if (el) createRoot(el).render(<StrictMode>{node}</StrictMode>);
}

/** Mounts the shared header (and footer, when the page has a #site-footer slot). */
export function mountChrome(props: SiteHeaderProps) {
  initThemeMode();
  mount("site-header", <SiteHeader {...props} />);
  mount("site-footer", <SiteFooter />);
}
