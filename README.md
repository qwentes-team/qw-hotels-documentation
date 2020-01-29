## Jekyll + Gulp setup

Is a starting point for static websites with [Jekyll](https://jekyllrb.com/) and [Gulp](http://gulpjs.com/)


## Structure:

```
_includes/          -> page fragments that compose your layout
_layouts/           -> layouts of the page
_posts/             -> posts
_sass/              -> scss files to be compiled
_site/              -> final output: after compile, the result will be here
css/
 └── main.scss      -> main css file
gulp/
 └── tasks/
      └─── task.js  -> gulp tasks for compile
js/
 ├── dev/           -> js files during dev phase
 └── prod/          -> js files after compiling (with browserify)
_config.yml         -> configuration file of jekyll
index.md            -> index of the page
```

## Setup:

- install ruby
- install npm
- run `npm install`

## Build:

```
$ gulp dev          -> build development environment
$ gulp prod         -> build production release
```

When you build for production, remember to put:
```
sass:
  style: compressed
```
in your _config.yml file, to minify the css file.
