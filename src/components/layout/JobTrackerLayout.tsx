import { useState } from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Saved", to: "/saved" },
  { label: "Digest", to: "/digest" },
  { label: "Settings", to: "/settings" },
  { label: "Proof", to: "/jt/proof" },
];

const JobTrackerLayout = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((open) => !open);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-slate-900">
      <header className="border-b border-slate-200 bg-[#F7F6F3]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-xl font-semibold tracking-tight text-slate-900">
              Job Notification Tracker
            </span>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-2 md:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  "border-b-2 border-transparent px-3 py-2 text-sm font-medium tracking-wide text-slate-700 transition-colors",
                  "hover:text-[#8B0000]",
                )}
                activeClassName="border-b-2 border-[#8B0000] text-[#8B0000]"
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile navigation toggle */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-2.5 py-1.5 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-100 md:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="flex flex-col gap-0.5">
              <span
                className={cn(
                  "h-0.5 w-5 rounded-full bg-slate-900 transition-transform",
                  isMenuOpen && "translate-y-[3px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-5 rounded-full bg-slate-900 transition-opacity",
                  isMenuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-5 rounded-full bg-slate-900 transition-transform",
                  isMenuOpen && "-translate-y-[3px] -rotate-45",
                )}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {isMobile && isMenuOpen && (
          <nav className="border-t border-slate-200 bg-[#F7F6F3] md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "border-l-2 border-transparent px-2 py-2 text-sm font-medium text-slate-800",
                    "hover:text-[#8B0000]",
                  )}
                  activeClassName="border-l-2 border-[#8B0000] text-[#8B0000]"
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto flex max-w-4xl flex-1 flex-col px-4 pb-12 pt-8 md:pt-12">
        <Outlet />
      </main>
    </div>
  );
};

export default JobTrackerLayout;

