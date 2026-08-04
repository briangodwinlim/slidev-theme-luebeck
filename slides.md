---
theme: ./
aspectRatio: 16/9
layout: cover
title: Presentation Title
subtitle: Optional Subtitle
title_short: Short Title
author: Author Name
institute_short: ORG
institute: |
  Department Name
  Organization Name
date: August 2026
bibliography: references.bib
citationStyle: apa
contact:
  title: Contact Me
  left:
    - icon: web
      label: www.site.org
      href: https://www.site.org
    - icon: email
      label: contact@site.org
      href: mailto:contact@site.org
    - icon: orcid
      label: John Doe
      href: https://orcid.org/
  right:
    - icon: github
      label: johndoe
      href: https://github.com/johndoe
    - icon: linkedin
      label: johndoe
      href: https://www.linkedin.com/in/johndoe
    - icon: researchgate
      label: John-Doe
      href: https://www.researchgate.net/profile/John-Doe
---

---
layout: default
section: Introduction
---

# Default Layout

Content slides use a full-width blue title bar. Inline citations use APA author–year by default [@knuth1984].

## Header 2

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### Header 3

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

---
layout: default
section: Introduction
subsection: Lists
---

# Bullet List

This is a bullet list:
* First item
* Second item with math: $E = mc^2$
* Third item citing prior work @lamport1994

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

---
layout: default
section: Introduction
subsection: Tables
---

# Table

This is a sample table:

| Item              | In Stock | Price |
| :---------------- | :------: | ----: |
| Python Hat        |   True   | 23.99 |
| SQL Hat           |   True   | 23.99 |
| Codecademy Tee    |  False   | 19.99 |
| Codecademy Hoodie |  False   | 42.99 |

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

---
layout: default
section: Content
subsection: Blocks
---

# Beamer Blocks

<BeamerBlock title="Definition">

A short definition or theorem statement. Surround with blank lines and don't indent the text to enable in-text citation @lamport1994.

</BeamerBlock>

<BeamerBlock title="Warning" type="alert">
  An important caution for the audience.
</BeamerBlock>

<BeamerBlock title="Example" type="example">
  A concrete illustrative example.
</BeamerBlock>

---
layout: notitle
section: Content
subsection: Notitle
---

The notitle layout keeps the header and footer but renders the heading in plain Lato without the blue title bar.

---
layout: default
section: Content
subsection: Math
---

# KaTeX

Inline: $a^2 + b^2 = c^2$ and $\mathcal{L}(f)$.

$$
\int_0^1 x^2 \, dx = \frac{1}{3}
$$

---
layout: default
section: Content
subsection: Image
---

# Image

<figure>
  <img src="https://picsum.photos/800/450" alt="..." class="mx-auto block w-650px" />
  <figcaption>A captioned figure with auto-numbered label.</figcaption>
  <figcaption class="no-figure-number">A captioned figure without numbered label.</figcaption>
</figure>

---
layout: default
section: Content
subsection: Citations
---

# Citations

Narrative cite: !@turing1936. Multiple refs: @knuth1984 @lamport1994.

---
layout: bibliography
section: References
subsection: Bibliography
---

# References

[[bibliography]]

---
layout: contact
section: Contact
---

<ContactSlide />
