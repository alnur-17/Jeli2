import Link from "next/link";
import { MAIN_NAV_LINKS } from "./nav-config";

const FOOTER_COMPANY = [
  { label: "Главная", href: "/" },
  ...MAIN_NAV_LINKS.filter((l) => l.href === "/how" || l.href === "/contacts"),
];

const FOOTER_PRODUCT = MAIN_NAV_LINKS.filter(
  (l) => l.href === "/businesses" || l.href === "/influencers" || l.href === "/pricing"
);

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="hover:opacity-80 transition-opacity inline-block">
              <img src="/jeli-logo.svg" alt="Jeli" className="h-5 w-auto" />
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Маркетинг через инфлюенсеров в Казахстане — без посредников и лишней рутины.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Соцсети и сообщества — объявим, когда появятся.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
              Компания
            </p>
            <ul className="space-y-2.5">
              {FOOTER_COMPANY.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
              Продукт
            </p>
            <ul className="space-y-2.5">
              {FOOTER_PRODUCT.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
              Вопросы
            </p>
            <p className="text-sm text-muted-foreground">
              Напишите на почту из раздела «Контакты» — ответим в рабочее время.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Jeli. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
