import type { Delimiter, MarkdownIt, StateInline } from "markdown-it"

// ^^new thought^^
//

// Insert each marker as a separate text token, and add it to delimiter list
//
function newthought_tokenize(state: StateInline, silent: boolean) {
  const start = state.pos
  const marker = state.src.charCodeAt(start)

  if (silent) {
    return false
  }

  if (marker !== 0x5e /* ^ */) {
    return false
  }

  const scanned = state.scanDelims(state.pos, true)
  let len = scanned.length
  const ch = String.fromCharCode(marker)

  if (len < 2) {
    return false
  }

  let token

  if (len % 2) {
    token = state.push("text", "", 0)
    token.content = ch
    len--
  }

  for (let i = 0; i < len; i += 2) {
    token = state.push("text", "", 0)
    token.content = ch + ch

    state.delimiters.push({
      marker,
      length: 0, // disable "rule of 3" length checks meant for emphasis
      token: state.tokens.length - 1,
      end: -1, // This pointer is filled in by the core balance_pairs post-processing rule
      open: scanned.can_open,
      close: scanned.can_close,
      jump: 0
    })
  }

  state.pos += scanned.length

  return true
}

function postProcess(state: StateInline, delimiters: Delimiter[]) {
  let token
  const loneMarkers = []
  const max = delimiters.length

  for (let i = 0; i < max; i++) {
    const startDelim = delimiters[i]

    if (startDelim.marker !== 0x5e /* ^ */) {
      continue
    }

    if (startDelim.end === -1) {
      continue
    }

    const endDelim = delimiters[startDelim.end]

    token = state.tokens[startDelim.token]
    token.type = "newthought_open"
    token.tag = "span"
    token.nesting = 1
    token.markup = "^^"
    token.content = ""
    token.attrSet("class", "newthought")

    token = state.tokens[endDelim.token]
    token.type = "newthought_close"
    token.tag = "span"
    token.nesting = -1
    token.markup = "^^"
    token.content = ""

    if (
      state.tokens[endDelim.token - 1].type === "text" &&
      state.tokens[endDelim.token - 1].content === "^"
    ) {
      loneMarkers.push(endDelim.token - 1)
    }
  }

  // If a marker sequence has an odd number of characters, it is split
  // like this: `^^^^^` -> `^` + `^^` + `^^`, leaving one marker at the
  // start of the sequence.
  //
  // So, we have to move all those markers after subsequent closing tags.
  //
  while (loneMarkers.length) {
    const i = loneMarkers.pop() || 0
    let j = i + 1

    while (j < state.tokens.length && state.tokens[j].type === "newthought_close") {
      j++
    }

    j--

    if (i !== j) {
      token = state.tokens[j]
      state.tokens[j] = state.tokens[i]
      state.tokens[i] = token
    }
  }
}

// Walk through delimiter list and replace text tokens with tags
//
function newthought_postProcess(state: StateInline) {
  const tokens_meta = state.tokens_meta
  const max = state.tokens_meta.length

  postProcess(state, state.delimiters)

  for (let curr = 0; curr < max; curr++) {
    if (tokens_meta[curr]?.delimiters) {
      postProcess(state, tokens_meta[curr]?.delimiters || [])
    }
  }

  // post-process return value is unused
  return false
}

/**
 * Adds "newthought" spans to inline sequences delimited with ^
 */
export default function doublethought_plugin(md: MarkdownIt) {
  md.inline.ruler.after("emphasis", "newthought", newthought_tokenize)
  md.inline.ruler2.after("emphasis", "newthought", newthought_postProcess)
}
