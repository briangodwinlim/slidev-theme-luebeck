export interface ContactEntry {
  label: string
  href?: string
  icon: 'web' | 'email' | 'github' | 'linkedin' | 'orcid' | 'researchgate'
}

export interface ContactConfig {
  title?: string
  left?: ContactEntry[]
  right?: ContactEntry[]
}
