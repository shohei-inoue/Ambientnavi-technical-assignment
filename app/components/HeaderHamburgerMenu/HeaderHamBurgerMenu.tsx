"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminLinks = [
  { name: "ダッシュボード", href: "/admin" },
  { name: "メニュー管理", href: "/admin/menu" },
  { name: "メニューカテゴリー管理", href: "/admin/categories" },
  { name: "テーブル管理", href: "/admin/tables" },
  { name: "お客様画面へ", href: "/" },
];

const userLinks = [
  { name: "メニュー", href: "/menu" },
  { name: "カート", href: "/cart" },
  {name: "注文履歴", href: "/order-history"},
  { name: "従業員管理画面へ", href: "/admin/auth/login" },
];

type HeaderHamBurgerMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const HeaderHamBurgerMenu: React.FC<HeaderHamBurgerMenuProps> = ({
  isOpen,
  onClose,
}) => {
  const pathname = usePathname();
  const links = pathname?.startsWith("/admin") ? adminLinks : userLinks;

  return (
    <nav
      className={`fixed top-0 right-0 h-full w-64 bg-white text-black shadow-lg p-4 z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={onClose}
        className="text-black text-sm mb-4 hover:underline"
      >
        閉じる
      </button>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="block hover:text-orange-400"
              onClick={onClose}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderHamBurgerMenu;
