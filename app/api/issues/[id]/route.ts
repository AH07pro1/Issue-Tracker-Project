import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });
    return NextResponse.json(issue, { status: 200 });
}
