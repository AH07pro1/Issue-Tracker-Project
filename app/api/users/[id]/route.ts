import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    console.log("Received ID:", params.id);

    if (!params.id) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const specificUser = await prisma.user.findUnique({
        where: { id: params.id },
    });

    console.log("Found user:", specificUser);

    if (!specificUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(specificUser, { status: 200 });
}


