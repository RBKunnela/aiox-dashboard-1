import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { resolveProjectRoot } from '@/lib/project-registry';
import { resolvePathWithin } from '@/lib/squad-api-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;
    const slugPath = slug.join('/');
    const projectRoot = await resolveProjectRoot(request);
    const docsRoot = path.resolve(projectRoot, 'docs');
    const resolved = resolvePathWithin(docsRoot, `${slugPath}.md`);

    // Separator-safe containment: reject siblings like ../docs-backup/...
    if (!resolved || !(resolved === docsRoot || resolved.startsWith(docsRoot + path.sep))) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    const content = await fs.readFile(resolved, 'utf-8');

    return NextResponse.json({ slug: slugPath, content });
  } catch (error) {
    return NextResponse.json(
      { error: `Document not found: ${error instanceof Error ? error.message : 'Unknown'}` },
      { status: 404 }
    );
  }
}
