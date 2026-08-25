import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  items: NavItem[];
}

export default function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1"
      >
        <span
          className={`h-px w-5 rounded-full bg-foreground transition-transform ${
            isOpen ? "translate-y-[5px] rotate-45" : ""
          }`}
        />

        <span
          className={`h-px w-5 rounded-full bg-foreground transition-opacity ${
            isOpen ? "opacity-0" : ""
          }`}
        />

        <span
          className={`h-px w-5 rounded-full bg-foreground transition-transform ${
            isOpen ? "-translate-y-[5px] -rotate-45" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full border-t border-border-light bg-white"
        >
          <div className="mx-auto w-full max-w-[1152px] px-5 py-4 sm:px-6 lg:px-8">
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="border-b border-border-light py-3 text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              ))}

              <a
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
              >
                Contact Us
              </a>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
