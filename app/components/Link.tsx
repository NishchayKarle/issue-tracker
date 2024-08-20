import { Link as RadixLink } from "@radix-ui/themes";
import NextLint from "next/link";

interface Props {
    href: string;
    children: string;
}

const Link = ({ href, children }: Props) => {
    return (
        <NextLint href={href} passHref legacyBehavior>
            <RadixLink>{children}</RadixLink>
        </NextLint>
    );
};

export default Link;
