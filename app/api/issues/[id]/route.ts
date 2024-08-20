import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const body = await request.json();
    const validate = issueSchema.safeParse(body);

    if (!validate.success)
        return NextResponse.json(validate.error.errors, { status: 400 });

    const updatedIssue = await prisma.issue.update({
        where: {
            id: parseInt(params.id),
        },
        data: {
            title: body.title,
            description: body.description,
        },
    });

    if (!updatedIssue)
        return NextResponse.json({ error: "Issue not found" }, { status: 404 });

    return NextResponse.json(updatedIssue);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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
