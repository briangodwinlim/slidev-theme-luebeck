export const BIBLIOGRAPHY_MARKER = '[[bibliography]]'
export const BIBLIOGRAPHY_LAYOUT = 'bibliography'
export const CITATIONS_COMMENT_RE = /<!--\s*scholarly-citations:\s*(\[.*?\])\s*-->\s*\n?/g
export const SCHOLARLY_CITATIONS_RE = /<!--\s*scholarly-citations:\s*(\[.*?\])\s*-->/

export interface LuebeckCitationConfig {
  bibFile: string
  bibStyle: string
  showNum: boolean
  citationIndex: Record<string, number>
}

declare global {
  // eslint-disable-next-line no-var
  var __luebeckConfig: LuebeckCitationConfig | undefined
}

export function resolveLuebeckCitationConfig(
  options: Record<string, unknown> = {},
): LuebeckCitationConfig {
  const config = globalThis.__luebeckConfig

  return {
    bibFile: (options.bibFile as string) || config?.bibFile || 'references.bib',
    bibStyle: (options.style as string) || config?.bibStyle || 'apa',
    showNum: (options.showNum as boolean | undefined) ?? config?.showNum ?? false,
    citationIndex: config?.citationIndex ?? {},
  }
}

/** citation-js "ieee" CSL renders author–year; use vancouver when numbered entries are requested. */
export function resolvePluginBibliographyStyle(bibStyle: string, showNum: boolean): string {
  if (showNum && bibStyle === 'ieee')
    return 'vancouver'
  return bibStyle
}

export function normalizeCitationSyntax(content: string): string {
  return content
    .replace(/\\citet\{([^}]+)\}/g, '!@$1')
    .replace(/\\cite[pt]?\{([^}]+)\}/g, '@$1')
    .replace(/\[@([a-zA-Z0-9_:-]+)\]/g, '@$1')
}

export function collectCitations(text: string, citekeys: Set<string>) {
  if (!text)
    return

  let stripped = normalizeCitationSyntax(text)
  stripped = stripped.replace(/```[\s\S]*?```/g, '')
  stripped = stripped.replace(/`[^`]*`/g, '')
  stripped = stripped.replace(/<!--[\s\S]*?-->/g, '')

  for (const match of stripped.matchAll(/!@([A-Za-z0-9_-]+)/g)) {
    const key = match[1]
    if (key.length > 0)
      citekeys.add(key)
  }

  for (const match of stripped.matchAll(/(?<![!@])@([A-Za-z0-9_-]+)/g)) {
    const key = match[1]
    if (key.length > 0)
      citekeys.add(key)
  }

  for (const match of stripped.matchAll(/\[@([A-Za-z0-9_-]+)\]/g)) {
    const key = match[1]
    if (key.length > 0)
      citekeys.add(key)
  }
}

export function collectOrderedCitations(
  slides: Array<{ content?: string; source?: { content?: string; contentRaw?: string } }>,
): string[] {
  const citekeys = new Set<string>()
  const ordered: string[] = []

  for (const slide of slides) {
    const text = slide.source?.contentRaw ?? slide.source?.content ?? slide.content ?? ''
    if (!text)
      continue

    let stripped = normalizeCitationSyntax(text)
    stripped = stripped.replace(/```[\s\S]*?```/g, '')
    stripped = stripped.replace(/`[^`]*`/g, '')
    stripped = stripped.replace(/<!--[\s\S]*?-->/g, '')

    for (const match of stripped.matchAll(/!@([A-Za-z0-9_-]+)|(?<![!@])@([A-Za-z0-9_-]+)|\[@([A-Za-z0-9_-]+)\]/g)) {
      const key = match[1] ?? match[2] ?? match[3]
      if (key && !citekeys.has(key)) {
        citekeys.add(key)
        ordered.push(key)
      }
    }
  }

  return ordered
}

export function toPluginCitations(keys: string[]): string[] {
  return keys.map(key => (key.startsWith('@') ? key : `@${key}`))
}
