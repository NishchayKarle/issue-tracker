"use client";

import classnames from 'classnames';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai"

const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        {
            href: "/",
            label: "Dashboard",
        },
        {
            href: "/issues",
            label: "Issues",
        },
    ];

    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/">
                <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
                {links.map((link) => (
                    <li
                        key={link.href}
                        className={classnames({
                            "text-zinc-900": currentPath === link.href,
                            "text-zinc-500": currentPath !== link.href,
                            "hover:text-zinc-800 transition-colors": true,
                        })}
                    >
                        <Link href={link.href}>{link.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;
