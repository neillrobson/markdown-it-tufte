# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Empty content no longer causes a null pointer exception in the sectionize rule
- Typographer content appearing prior to a footnote in an inline block is now appropriately replaced

## [1.0.1] - 2025-04-08

### Fixed

- Inline sidenotes are now parsed by the Typographer extension

## [1.0.0] - 2025-02-14

### Fixed

- Lone/dangling carets in newthought markers are now consistently shifted outside the resulting span tag
- Standalone images inside other blocks are now captured and rendered as `<figure>` elements

## [0.3.0] - 2025-01-23

### Added

- Special parsing for standalone images (`![alt text](/path.png "title text")`) using `figure` and `figcaption`
  - If the [`markdown-it-attrs`](https://github.com/arve0/markdown-it-attrs) plugin is installed, adding `{.fullwidth}` at the end of an image will add that class to the `figure`.

## [0.2.0] - 2025-01-20

### Added

- Slug IDs for sections (defined by second-level headings and new-thoughts)

## [0.1.0] - 2025-01-13

**Initial release!** :tada:

### Added

- Side notes: `[^ref]` in the text with `[^ref]: contents of note` somewhere else in the Markdown.
- Inline side notes: `^[contents of note]` in the text.
- Margin notes: `[^ref]: {-} contents of note` or `^[{-} contents of note]`. Same as side note, but omits the reference number.
- New-thought markers: `^^Happy families are all alike;^^ every unhappy family is unhappy in its own way.` Renders the text surrounded by `^^` in small caps.
- Automatic `<section>` breaks:
  - Entire text will be surrounded by at least one `<section>`
  - Each second-level heading will trigger a section split immediately above it
  - Each paragraph starting with a new-thought will trigger a section split immediately above it

[Unreleased]: https://github.com/neillrobson/markdown-it-tufte/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/neillrobson/markdown-it-tufte/releases/tag/v1.0.1
[1.0.0]: https://github.com/neillrobson/markdown-it-tufte/releases/tag/v1.0.0
[0.3.0]: https://github.com/neillrobson/markdown-it-tufte/releases/tag/v0.3.0
[0.2.0]: https://github.com/neillrobson/markdown-it-tufte/releases/tag/v0.2.0
[0.1.0]: https://github.com/neillrobson/markdown-it-tufte/releases/tag/v0.1.0
