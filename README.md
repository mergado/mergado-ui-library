# Mergado UI Library

## Styles

Stylesheet is available as both SASS source and compiled/minified CSS.
We included basics like css reset, typography, icons and of course styles for individual UI components.

## Images / Icons

All (two) images needed are inlined into CSS. Only icons are as extra files.

We use technique called SVG sprite. That means all icons are in a single svg file. We included this file, source svg files for each icons and script which will generate sprite file from source icons, it's in `bin` folder.

## Javascript

Checkboxes and radiobuttons are notoriously hard to style.
We use some JS magic, to help us with that and decided to share it with you.
Just put `script` tag pointing to this JS script this in your HTML and you're good to go.

Unless you're using React or similar framework. In that case, you are better of writing your own component in your framework style.

## Docs

[Mergado Docs](https://mergado.github.io/docs/design/intro.html)
