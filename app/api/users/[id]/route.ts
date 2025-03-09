import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, context: Context) {
    const { id } = await context.params;

    console.log("Received ID:", id);

    if (!id) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const specificUser = await prisma.user.findUnique({
        where: { id },
    });

    console.log("Found user:", specificUser);

    if (!specificUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(specificUser, { status: 200 });
}
