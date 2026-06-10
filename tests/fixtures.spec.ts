/* eslint-disable jest/valid-title */
import fs from "fs"
import MarkdownIt from "markdown-it"
import example_plugin from "../src"

/** Read a "fixtures" file, containing a set of tests:
 *
 * test name
 * .
 * input text
 * .
 * expected output
 * ..
 *
 * */
function readFixtures(name: string): string[][] {
  const fixtures = fs.readFileSync(`tests/fixtures/${name}.md`).toString()
  const processed = fixtures
    .replace(/\r\n/g, "\n")
    .split(/^\.\.$/gm)
    .map(s =>
      s
        .trim()
        .split(/^\.$/gm)
        .map(p => p.trim())
    )
  processed.pop()
  return processed
}

describe("Parses newthought", () => {
  readFixtures("newthought").forEach(([name, text, expected]) => {
    const mdit = MarkdownIt().use(example_plugin)
    const rendered = mdit.render(text).trim()
    it(name, () => expect(rendered).toEqual(expected))
  })
})

describe("Parses sidenote", () => {
  readFixtures("sidenote").forEach(([name, text, expected]) => {
    const mdit = MarkdownIt({ typographer: true }).use(example_plugin)
    const rendered = mdit.render(text).trim()
    it(name, () => expect(rendered).toEqual(expected))
  })
})

describe("Parses section", () => {
  readFixtures("sectionize").forEach(([name, text, expected]) => {
    const mdit = MarkdownIt().use(example_plugin)
    const rendered = mdit.render(text).trim()
    it(name, () => expect(rendered).toEqual(expected))
  })
})

describe("Parses figure", () => {
  readFixtures("figure").forEach(([name, text, expected]) => {
    const mdit = MarkdownIt().use(example_plugin)
    const rendered = mdit.render(text).trim()
    it(name, () => expect(rendered).toEqual(expected))
  })
})
