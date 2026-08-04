import { defineTransformersSetup } from '@slidev/types'
import type { MarkdownTransformer } from '@slidev/types'
import {
  BIBLIOGRAPHY_LAYOUT,
  BIBLIOGRAPHY_MARKER,
  CITATIONS_COMMENT_RE,
  collectOrderedCitations,
  normalizeCitationSyntax,
  toPluginCitations,
} from './citations'

const normalizeCitationsTransformer: MarkdownTransformer = async ({ s }) => {
  const source = s.toString()
  const normalized = normalizeCitationSyntax(source)
  if (normalized !== source)
    s.update(0, source.length, normalized)
}

const transformBibliographyMarkdown: MarkdownTransformer = async (ctx) => {
  const original = ctx.s.toString()
  const frontmatter = ctx.slide.frontmatter as Record<string, unknown>
  let transformed = ensureBibliographyMarker(original, frontmatter)

  if (transformed.includes(BIBLIOGRAPHY_MARKER)) {
    const citations = resolveBibliographyCitations(frontmatter, ctx.options.data.slides)
    transformed = injectBibliographyComment(transformed, citations)
  }

  if (transformed !== original) {
    if (original.length === 0)
      ctx.s.appendLeft(0, transformed)
    else
      ctx.s.overwrite(0, original.length, transformed)
  }
}

function resolveBibliographyCitations(
  frontmatter: Record<string, unknown>,
  slides: Array<{ content?: string; source?: { content?: string; contentRaw?: string } }>,
): string[] {
  let citations: string[] = []

  if (Array.isArray(frontmatter.citations))
    citations = toPluginCitations(frontmatter.citations as string[])
  else if (Array.isArray(frontmatter.references))
    citations = toPluginCitations(frontmatter.references as string[])
  else if (Array.isArray(frontmatter.bib))
    citations = toPluginCitations(frontmatter.bib as string[])
  else {
    citations = toPluginCitations(collectOrderedCitations(slides))
  }

  return citations
}

function injectBibliographyComment(content: string, citations: string[]): string {
  if (!citations.length)
    return content

  const sanitized = content.replace(CITATIONS_COMMENT_RE, '')
  const citationsJson = JSON.stringify(citations)

  return sanitized.replaceAll(
    BIBLIOGRAPHY_MARKER,
    `<!-- scholarly-citations: ${citationsJson} -->\n${BIBLIOGRAPHY_MARKER}`,
  )
}

function ensureBibliographyMarker(content: string, frontmatter: Record<string, unknown>): string {
  if ((frontmatter.layout as string | undefined) !== BIBLIOGRAPHY_LAYOUT)
    return content

  if (content.includes(BIBLIOGRAPHY_MARKER))
    return content

  const stripped = content
    .replace(CITATIONS_COMMENT_RE, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^\s*#{1,6}\s+.*$/gm, '')
    .replace(/^\s*---+\s*$/gm, '')

  if (stripped.trim().length > 0)
    return content

  const trimmed = content.trim()
  if (trimmed.length > 0)
    return `${trimmed}\n\n${BIBLIOGRAPHY_MARKER}\n`

  return `${BIBLIOGRAPHY_MARKER}\n`
}

export default defineTransformersSetup(() => ({
  pre: [normalizeCitationsTransformer, transformBibliographyMarkdown],
}))
