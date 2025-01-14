# Markdown-It Tufte

[![ci-badge]][ci-link]
[![npm-badge]][npm-link]

> A markdown-it plugin for creating documents compatible with Tufte CSS.

[ci-badge]: https://github.com/neillrobson/markdown-it-tufte/workflows/CI/badge.svg
[ci-link]: https://github.com/neillrobson/markdown-it-tufte/actions
[npm-badge]: https://img.shields.io/npm/v/markdown-it-tufte.svg
[npm-link]: https://www.npmjs.com/package/markdown-it-tufte

## Pre-1.0.0 Package

Much of the syntax and structure is still subject to change, as I learn how to create a robust Markdown-It plugin!

## To-Do List

- [x] Complete side-note/margin-note implementation (specifically, the `{-}` prefix)
- [x] Automatically split `<section>`s, based on `newthought`s and `h2`s
- [x] Change `newthought` to requiring a double caret `^^` delimiter (maybe?)

Most likely, once the above items are complete, we'll do the first NPM-published package.
There are plenty of "post-release" items to consider though:

- [ ] Syntax for `<figure>`s
- [ ] Epigraph-style block quotes, and `<footer>` citations
- [ ] "Slug IDs" for sections (both header and newthought-based), for easy linking
- [ ] Brainstorm: `<section>` splitting on `<hr>`.

    Should it be done automatically? Perhaps choose one of the three possible markers (`*` `-` `_`) to be an "invisible" break, replaced with simply a `</section><section>`.

    Note that, in doing so, we will also need to strip out empty (consecutive) sections created by e.g. a `***` followed by an second-level heading.
