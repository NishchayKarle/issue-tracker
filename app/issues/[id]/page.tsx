import authOptions from "@/app/auth/AuthOptions";
import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
    params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions);
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id),
        },
    });

    if (!issue) {
        notFound();
    }

    return (
        <Grid columns={{ initial: "1", sm: "5" }} className="gap-5">
            <Box className="md:col-span-4">
                <IssueDetails issue={issue} />
            </Box>
            {session && (
                <Box>
                    <div className="flex flex-col gap-2">
                        <EditIssueButton issueId={issue.id} />
                        <DeleteIssueButton issueId={issue.id} />
                    </div>
                </Box>
            )}
        </Grid>
    );
};

export default IssueDetailPage;
