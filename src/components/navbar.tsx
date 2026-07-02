"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { Waveform } from "@/components/waveform";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/members", label: "Members" },
  { href: "/setlist", label: "Set List" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink bg-paper">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-6xl items-stretch justify-between pl-5 md:pl-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-lg font-medium tracking-tight"
        >
          <Waveform className="h-3" barClassName="bg-cobalt" />
          Sumting Blue
        </Link>

        <div className="hidden items-stretch md:flex">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center border-l border-ink/15 px-5 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                  active
                    ? "text-cobalt underline decoration-2 underline-offset-4"
                    : "text-ink hover:text-cobalt"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <ThemeToggle className="flex items-center border-l border-ink/15 px-5" />
          <Link
            href="/book"
            className="flex items-center border-l border-ink bg-ink px-6 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:bg-cobalt"
          >
            Book Us
          </Link>
        </div>

        <div className="flex items-stretch md:hidden">
          <ThemeToggle className="flex items-center px-4" />
          <Link
            href="/book"
            className="flex items-center border-l border-ink bg-ink px-4 font-mono text-xs uppercase tracking-[0.14em] text-paper"
          >
            Book
          </Link>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              className="flex items-center border-l border-ink px-4"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-paper" />
              <Dialog.Content className="fixed inset-0 z-50 flex flex-col">
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <div className="flex h-14 items-center justify-between border-b border-ink px-5">
                  <span className="flex items-center gap-2.5 font-display text-lg font-medium">
                    <Waveform className="h-3" barClassName="bg-cobalt" />
                    Sumting Blue
                  </span>
                  <Dialog.Close aria-label="Close menu" className="p-2">
                    <X size={22} />
                  </Dialog.Close>
                </div>
                <div className="flex flex-1 flex-col">
                  {[...links, { href: "/book", label: "Book Us" }].map(
                    ({ href, label }, i) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setOpen(false)}
                        className={`flex items-baseline gap-4 border-b border-ink/15 px-5 py-5 ${
                          href === "/book" ? "text-cobalt" : ""
                        }`}
                      >
                        <span className="font-mono text-xs text-muted">
                          0{i + 1}
                        </span>
                        <span
                          className={`font-display text-3xl ${
                            pathname === href ? "italic text-cobalt" : ""
                          }`}
                        >
                          {label}
                        </span>
                      </Link>
                    ),
                  )}
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </nav>
    </header>
  );
}
