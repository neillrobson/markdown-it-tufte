import type MarkdownIt from "markdown-it"
import type StateCore from "markdown-it/lib/rules_core/state_core"
import type Token from "markdown-it/lib/token"

const slugify = (s: string) =>
  encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, "-"))

function getTokensText(tokens: Token[]) {
  return tokens
    .filter(t => ["text", "code_inline"].includes(t.type))
    .map(t => t.content)
    .join("")
}

function getSectionPair(state: StateCore) {
  const open = new state.Token("section_open", "section", 1)
  open.block = true
  const close = new state.Token("section_close", "section", -1)
  close.block = true

  return { open, close }
}

function sectionize(state: StateCore) {
  const slugs: Record<string, boolean> = {}
  const toProcess: Array<{ slug: string; anchor: Token; target: Token }> = []

  if (state.tokens.length === 0) return

  // Iterate backwards since we're splicing elements into the array
  for (let i = state.tokens.length - 1; i >= 0; i--) {
    const token = state.tokens[i]

    if (token.type === "heading_open" && token.tag === "h2") {
      const slug = slugify(getTokensText(state.tokens[i + 1].children || []))

      const { open, close } = getSectionPair(state)

      const divOpen = new state.Token("heading_open", "div", 1)
      divOpen.block = true
      divOpen.attrSet("class", "section-link")
      const divClose = new state.Token("heading_close", "div", -1)
      divClose.block = true
      const anchorOpen = new state.Token("section_anchor_open", "a", 1)
      anchorOpen.attrSet("class", "no-tufte-underline")
      const anchorClose = new state.Token("section_anchor_close", "a", -1)

      toProcess.unshift({
        slug,
        anchor: anchorOpen,
        target: token
      })

      let j
      for (j = i; j < state.tokens.length; j++) {
        const { type, tag } = state.tokens[j]
        if (type === "heading_close" && tag === "h2") break
      }
      state.tokens.splice(j + 1, 0, divClose)

      state.tokens.splice(i, 0, close, open, divOpen, anchorOpen, anchorClose)
    } else if (token.type === "paragraph_open") {
      const inline = state.tokens[i + 1]
      if (inline.type === "inline") {
        const firstChild = inline.children?.[0]
        if (firstChild?.type === "newthought_open") {
          const { open, close } = getSectionPair(state)
          state.tokens.splice(i, 0, close, open)

          const newThoughtTokens =
            inline.children?.slice(
              1,
              inline.children.findIndex(({ type }) => type === "newthought_close")
            ) || []
          const slug = slugify(getTokensText(newThoughtTokens))

          const anchorOpen = new state.Token("section_anchor_open", "a", 1)
          anchorOpen.attrSet("class", "no-tufte-underline")
          const anchorClose = new state.Token("section_anchor_close", "a", -1)

          toProcess.unshift({
            slug,
            anchor: anchorOpen,
            target: firstChild
          })

          inline.children?.splice(1, 0, anchorOpen, anchorClose)
        }
      }
    }
  }

  for (const data of toProcess) {
    const slugBase = data.slug
    let slug = slugBase
    let count = 0
    while (slugs[slug]) {
      slug = `${slugBase}-${++count}`
    }
    slugs[slug] = true

    data.anchor.attrSet("href", `#${slug}`)
    data.target.attrSet("id", slug)
  }

  if (state.tokens[0].type === "section_close") {
    state.tokens.push(state.tokens.shift()!)
  } else {
    const { open, close } = getSectionPair(state)
    state.tokens.unshift(open)
    state.tokens.push(close)
  }
}

export default function footnote_plugin(md: MarkdownIt) {
  // Run after absolutely everything else. This increments the nesting level for all of the content within.
  md.core.ruler.push("sectionize", sectionize)
}
