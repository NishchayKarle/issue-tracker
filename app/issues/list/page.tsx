import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import Pagination from "../_components/Pagination";
import IssueActions from "./issueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";

interface Props {
    searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined;

    const orderBy = columnNames.includes(searchParams.orderBy)
        ? {
              [searchParams.orderBy]: "asc",
          }
        : undefined;

    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

    const issues = await prisma.issue.findMany({
        where: {
            status: status,
        },
        orderBy: orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const issueCount = await prisma.issue.count({
        where: {
            status: status,
        },
    });

    return (
        <Flex direction="column" gap="3">
            <IssueActions />
            <IssueTable searchParams={searchParams} issues={issues} />
            <Flex justify="center">
                <Pagination
                    itemCount={issueCount}
                    pageSize={pageSize}
                    currentPage={page}
                />
            </Flex>
        </Flex>
    );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
