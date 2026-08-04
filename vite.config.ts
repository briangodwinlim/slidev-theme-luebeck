import path from 'node:path'
import citationPluginMod from '@jxpeng98/markdown-it-citation'
import { defineConfig } from 'vite'
import {
  resolveLuebeckCitationConfig,
  resolvePluginBibliographyStyle,
  SCHOLARLY_CITATIONS_RE,
} from './setup/citations.ts'

const CITATION_SETUP_FLAG = Symbol.for('luebeck.citation.setup')

function resolveCitationPlugin(mod: unknown): unknown {
  return (mod as { default?: unknown } | undefined)?.default ?? mod
}

function resolveCitationConfig() {
  const config = resolveLuebeckCitationConfig()
  const style = resolvePluginBibliographyStyle(config.bibStyle, config.showNum)

  return {
    bibFile: path.resolve(process.cwd(), config.bibFile),
    style,
    showNum: style === 'vancouver' ? false : config.showNum,
    bibTitle: '',
    autoGenerate: false,
  }
}

function setupCitationMarkdown(md: any) {
  if (md[CITATION_SETUP_FLAG])
    return

  md[CITATION_SETUP_FLAG] = true

  const citationPlugin = resolveCitationPlugin(citationPluginMod)
  if (typeof citationPlugin !== 'function') {
    console.warn('[luebeck] citation plugin is not a function')
    return
  }

  const pluginOptions = resolveCitationConfig()
  md.use(citationPlugin, pluginOptions)

  md.core.ruler.before('citation_bibliography', 'luebeck_citations_parser', (state: any) => {
    const match = state.src.match(SCHOLARLY_CITATIONS_RE)
    if (!match)
      return

    try {
      const citations = JSON.parse(match[1]) as string[]
      state.env ||= {}
      state.env.frontmatter ||= {}
      state.env.frontmatter.citations = citations
    }
    catch (error) {
      console.error('[luebeck] Failed to parse scholarly-citations comment:', error)
    }
  })
}

export default defineConfig({
  slidev: {
    markdown: {
      markdownSetup(md: any) {
        setupCitationMarkdown(md)
      },
      markdownItSetup(md: any) {
        setupCitationMarkdown(md)
      },
    },
  },
})
