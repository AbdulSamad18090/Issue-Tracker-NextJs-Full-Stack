import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validatioSchemas";

export async function POST(request: NextRequest) {
  // convert request into json format
  const body = await request.json()
  // now we have request body
  // before we create issue,  we have to validate our request to make sure ...
  // it doesn't have bad data
  // for data validation,  we use zod -> (npm i zot)
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description
    }
  })
  return NextResponse.json(newIssue, { status: 201 })
}