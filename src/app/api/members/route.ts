import fs from "fs";
import path from "path";
import { NextResponse } from 'next/server'

export async function GET() {
  const membersDir = path.join(process.cwd(), "src/members");
  const files = fs.readdirSync(membersDir).filter(f => f.endsWith(".json"));
  const members = files.map(file => {
    const data = fs.readFileSync(path.join(membersDir, file), "utf8");
    return JSON.parse(data);
  });

  return NextResponse.json(members)
}