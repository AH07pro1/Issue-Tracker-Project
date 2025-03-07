import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "./createIssueSchema";

const prisma = new PrismaClient();

export async function GET(request: NextRequest){
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
}


export async function POST(request: NextRequest){
  const body = await request.json();

  if (!body) {
    return NextResponse.json({ error: "Request body is null" }, { status: 400 });
  }

  const validation = schema.safeParse(body);

  if(!validation.success){
    return NextResponse.json({error: validation.error.errors}, {status: 400});
  }

  const issue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
      assignedToUserId: body.assignedToUserId,
      assignedToUser: body.assignedToUser,
      createdByUserId: body.createdByUserId,
      createdByUserName: body.createdByUserName,
      createdByUser: body.createdbyUser,
      
    }
  });
  return NextResponse.json({issue}, {status: 201});
}