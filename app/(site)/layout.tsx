import Link from "next/link"
import { menu } from "@/actions/menu"

import { Footer } from "@/components/footer"
import { Section } from "@/components/section"

type Props = {
  children: React.ReactNode
}
const SiteLayout: React.FC<Props> = async ({ children }) => {
  const menuGlobal = await menu({ depth: 3 })
  return (
    <>
      <header className="fixed left-4 top-4 z-50 flex items-center overflow-hidden rounded-full bg-muted/60 p-1 backdrop-blur md:w-fit">
        <Link
          scroll={false}
          href="/"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground"
        >
          <span className="font-mono italic text-white">AB</span>
        </Link>
        <nav className="flex items-center gap-3 pl-4 pr-7 text-xs text-muted-foreground/70">
          {menuGlobal?.nav.map((item) => (
            <Link
              className="capitalize"
              scroll={false}
              key={item.id}
              href={`/${item.link.label.toLowerCase()}`}
            >
              {item.link.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
      <Footer />
    </>
  )
}
export default SiteLayout
