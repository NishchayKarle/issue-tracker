import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validate = createIssueSchema.safeParse(body);

    if (!validate.success)
        return NextResponse.json(validate.error.errors, { status: 400 });

    const newIssue = await prisma.issue.create({
        data: {
            title: validate.data.title,
            description: validate.data.description,
        },
    });

    return NextResponse.json(newIssue, { status: 201 });
}
