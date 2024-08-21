import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./issues/list/IssueSummary";
import LatestIssues from "./LatestIssues";

export default async function Home() {
    const open = await prisma.issue.count({
        where: {
            status: "OPEN",
        },
    });
    const inProgress = await prisma.issue.count({
        where: {
            status: "IN_PROGRESS",
        },
    });
    const closed = await prisma.issue.count({
        where: {
            status: "CLOSED",
        },
    });

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Flex direction="column" gap="4">
                <IssueSummary
                    open={open}
                    inProgress={inProgress}
                    closed={closed}
                />
                <IssueChart
                    open={open}
                    inProgress={inProgress}
                    closed={closed}
                />
            </Flex>
            <LatestIssues />
        </Grid>
    );
}
