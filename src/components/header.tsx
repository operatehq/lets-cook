"use client";
import {
  CarrotIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TagIcon,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { Button } from "./button";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/cva.config";

const NavLink = ({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}) => {
  return (
    <Link
      href={href}
      className={cx(
        "opacity-50 hover:opacity-100 transition-opacity flex items-center gap-3 text-xl",
        isActive && "opacity-100",
      )}
    >
      {children}
    </Link>
  );
};

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <header className="flex items-center p-4 w-full">
      <nav className="flex items-center gap-4 w-full max-w-7xl mx-auto">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex gap-12 py-2 ml-12 font-semibold">
          <NavLink href="/" isActive={isHome}>
            <CarrotIcon size={18} weight="bold" className="text-accent" />
            My Recipes
          </NavLink>
          <NavLink href="#" isActive={false}>
            <TagIcon size={18} weight="bold" className="text-accent" />
            Categories
          </NavLink>
          <NavLink href="#" isActive={false}>
            <MagnifyingGlassIcon
              size={18}
              weight="bold"
              className="text-accent"
            />
            Search
          </NavLink>
        </div>
        <div className="flex gap-4 ml-auto">
          <Button as="link" href="/new" className="shadow-2xl">
            <PlusIcon size={18} weight="bold" className="text-accent" />
            New Recipe
          </Button>
        </div>
      </nav>
    </header>
  );
}
