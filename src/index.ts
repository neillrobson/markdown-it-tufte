import type { MarkdownIt } from "markdown-it"
import newthought_plugin from "./rules/newthought"
import sidenote_plugin from "./rules/sidenote"
import sectionize_plugin from "./rules/sectionize"
import figure_plugin from "./rules/figure"

export default function plugin(md: MarkdownIt) {
  newthought_plugin(md)
  sidenote_plugin(md)
  sectionize_plugin(md)
  figure_plugin(md)
}
