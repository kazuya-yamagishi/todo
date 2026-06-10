import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const data = await req.json()
  const todo = await prisma.todo.update({ where: { id: Number(id) }, data })
  return NextResponse.json(todo)
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await prisma.todo.delete({ where: { id: Number(id) } })
  return new NextResponse(null, { status: 204 })
}
