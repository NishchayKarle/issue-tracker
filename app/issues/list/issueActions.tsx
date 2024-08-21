import { Issue, Status } from "@prisma/client";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";
interface Props {
    searchParams: { status: Status; orderBy?: keyof Issue };
}

const issueActions = () => {
    return (
        <Flex justify="between">
            <IssueStatusFilter />
            <Button>
                <Link href="/issues/new">New Issue</Link>
            </Button>
        </Flex>
    );
};

export default issueActions;
