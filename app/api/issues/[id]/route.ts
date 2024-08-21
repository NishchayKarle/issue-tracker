import AuthOptions from "@/app/auth/AuthOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(AuthOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await request.json();
    const validate = patchIssueSchema.safeParse(body);

    if (!validate.success)
        return NextResponse.json(validate.error.errors, { status: 400 });

    if (body.assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: {
                id: body.assignedToUserId,
            },
        });

        if (!user)
            return NextResponse.json(
                { error: "Invalid user." },
                { status: 400 }
            );
    }

    const updatedIssue = await prisma.issue.update({
        where: {
            id: parseInt(params.id),
        },
        data: {
            title: body.title,
            description: body.description,
            assignedToUserId: body.assignedToUserId,
        },
    });

    if (!updatedIssue)
        return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

    return NextResponse.json(updatedIssue);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(AuthOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const issue = await prisma.issue.delete({
        where: {
            id: parseInt(params.id),
        },
    });

    if (!issue)
        return NextResponse.json({ error: "Issue not found" }, { status: 404 });

    prisma.issue.delete({ where: { id: parseInt(params.id) } });

    return NextResponse.json({});
}
