import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "../createIssueSchema";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });
    return NextResponse.json(issue, { status: 200 });
}


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.json();
  
    if (!body) {
      return NextResponse.json({ error: "Request body is null" }, { status: 400 });
    }
  
    const validation = schema.safeParse(body);
  
    if(!validation.success){
      return NextResponse.json({error: validation.error.errors}, {status: 400});
    }
  
    const updatedIssue = await prisma.issue.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        status: body.status,
        description: body.description,
        
      }
    });
    return NextResponse.json({updatedIssue}, {status: 201});
  }