import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "../createIssueSchema";

const prisma = new PrismaClient();

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, context: Context) {
    const { id } = await context.params;

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });

    return NextResponse.json(issue, { status: 200 });
}

export async function PUT(request: NextRequest, context: Context) {
    const { id } = await context.params;
    const body = await request.json();

    if (!body) {
        return NextResponse.json({ error: "Request body is null" }, { status: 400 });
    }

    const validation = schema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json({ error: validation.error.errors }, { status: 400 });
    }

    const updatedIssue = await prisma.issue.update({
        where: { id: parseInt(id) },
        data: {
            title: body.title,
            status: body.status,
            description: body.description,
            assignedToUserId: body.assignedToUserId
        }
    });

    return NextResponse.json({ updatedIssue }, { status: 201 });
}

export async function DELETE(_req: NextRequest, context: Context) {
    const { id } = await context.params;

    const deletedIssue = await prisma.issue.delete({
        where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Issue deleted successfully", deletedIssue }, { status: 200 });
}
