import { defineVitePluginsSetup } from '@slidev/types'
import { collectOrderedCitations } from './citations'

declare global {
  // eslint-disable-next-line no-var
  var __luebeckConfig: {
    bibFile: string
    bibStyle: string
    showNum: boolean
    citationIndex: Record<string, number>
  } | undefined
}

export default defineVitePluginsSetup((options) => {
  const headmatter = options.data.headmatter || {}
  const bibFile = (headmatter.bibliography as string)
    ?? (headmatter.bibFile as string)
    ?? 'references.bib'
  const bibStyle = (headmatter.citationStyle as string)
    ?? (headmatter.bibStyle as string)
    ?? 'apa'
  const showNum = (headmatter.showNum as boolean | undefined)
    ?? (headmatter.bibShowNum as boolean | undefined)
    ?? false

  const orderedKeys = collectOrderedCitations(options.data.slides)
  const citationIndex: Record<string, number> = {}
  orderedKeys.forEach((key, index) => {
    citationIndex[key] = index + 1
  })

  globalThis.__luebeckConfig = { bibFile, bibStyle, showNum, citationIndex }

  return []
})
