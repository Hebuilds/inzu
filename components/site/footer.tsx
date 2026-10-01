import { LogoMark } from "@/components/site/logo";
import { footer, links } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-fog-white">
      <div className="shell pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <LogoMark className="h-8" />
            <p className="mt-6 text-[16px] leading-normal text-slate-gray">{footer.blurb}</p>
            <p className="mt-6 text-meta text-ash-gray">Available in {footer.languages.join(" · ")}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[16px] font-medium">{column.title}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[16px] text-slate-gray transition-colors duration-200 hover:text-ink-black"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-hairline pt-8 text-meta text-slate-gray sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Inzu Connect. All rights reserved.</p>
          <a href={links.status} className="inline-flex items-center gap-2 hover:text-ink-black">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ink-black/30" />
              <span className="relative inline-flex size-2 rounded-full bg-ink-black" />
            </span>
            All services operational
          </a>
          <p>
            A{" "}
            <a href={links.maker} className="underline-offset-4 hover:text-ink-black hover:underline">
              Malos Tech
            </a>{" "}
            product
          </p>
        </div>
      </div>
    </footer>
  );
}
