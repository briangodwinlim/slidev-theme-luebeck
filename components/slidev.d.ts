declare module '@slidev/types' {
  interface SlidevConfig {
    subtitle?: string
    title_short?: string
    institute?: string
    institute_short?: string
    date?: string
    date_short?: string
    /** BibTeX file path (default: references.bib) */
    bibliography?: string
    /** Citation style for citation-js (default: apa) */
    citationStyle?: string
    /** Alias for bibliography */
    bibFile?: string
    /** Alias for citationStyle */
    bibStyle?: string
    /** Numbered bibliography entries (default: false) */
    showNum?: boolean
    /** Alias for showNum */
    bibShowNum?: boolean
    /** Default contact slide content */
    contact?: import('./components/contact-types').ContactConfig
  }

  interface SlideFrontmatter {
    section?: string
    subsection?: string
    contact?: import('./components/contact-types').ContactConfig
  }
}
