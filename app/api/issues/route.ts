import AuthOptions from "@/app/auth/AuthOptions";
import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const session = await getServerSession(AuthOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await request.json();
    const validate = issueSchema.safeParse(body);

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
