"use client";

import {
    Avatar,
    Box,
    Container,
    DropdownMenu,
    Flex,
    Text,
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import Skeleton from "./components/Skeleton";

const NavBar = () => {
    return (
        <nav className="border-b mb-5 px-5 py-3">
            <Container>
                <Flex justify="between">
                    <NavLinks />
                    <AuthStatus />
                </Flex>
            </Container>
        </nav>
    );
};

export default NavBar;

const NavLinks = () => {
    const currentPath = usePathname();

    const links = [
        {
            href: "/",
            label: "Dashboard",
        },
        {
            href: "/issues/list",
            label: "Issues",
        },
    ];

    return (
        <Flex align="center" gap="3">
            <Link href="/">
                <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
                {links.map((link) => (
                    <li
                        key={link.href}
                        className={classnames({
                            "nav-link": true,
                            "!text-zinc-900": currentPath === link.href,
                        })}
                    >
                        <Link href={link.href}>{link.label}</Link>
                    </li>
                ))}
            </ul>
        </Flex>
    );
};

const AuthStatus = () => {
    const { status, data: session } = useSession();
    if (status === "loading") return <Skeleton width="3rem" />;

    if (status === "unauthenticated")
        return (
            <Link className="nav-link" href="/api/auth/signin">
                Log In
            </Link>
        );
    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar
                        src={session!.user!.image!}
                        fallback={"?"}
                        size="2"
                        radius="full"
                        className="cursor-pointer"
                    />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size="2">{session!.user!.email!}</Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href="/api/auth/signout">Log Out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    );
};
