import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
const createIssueSchema = z.object({  // validation schema for request body
  title: z.string().min(1).max(255),
  description: z.string().min(1)
})

export async function POST(request: NextRequest) {
  // convert request into json format
  const body = await request.json()
  // now we have request body
  // before we create issue,  we have to validate our request to make sure ...
  // it doesn't have bad data
  // for data validation,  we use zod -> (npm i zot)
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 })
  }
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description
    }
  })
  return NextResponse.json(newIssue, { status: 201 })
}