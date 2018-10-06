[![build](https://img.shields.io/badge/Build-passing-brightgreen.svg)]()
[![npm](https://img.shields.io/npm/v/npm.svg?label=npm%20package)](https://www.npmjs.com/)
[![gulp](https://img.shields.io/badge/gulp-v3.9.1-blue.svg)](https://www.npmjs.com/package/gulp)

# template-gulp
This is a template to setup basic gulp based project.

# Setup
1. Clone the repo
2. Install npm packages `npm install`
3. Install bower packages `bower install`

# Gulp tasks
## Default task
Start gulp task for SCSS & JS linting and minification along with watching continuous updates.
```
> gulp
```

## Watch task
Start gulp task to watch updates to SCSS & JS files.
```
> gulp watch
```

## Vendor tasks
Start gulp task for vendor CSS & JS linting and minification.
```
> gulp vendor
```

## Full task
Start gulp task to do all the above steps except watching for updates.
```
> gulp full
```

## Lint report generation tasks
Start gulp task to generate reports for SCSS lint and JSHint (JS lint)
```
> # generate SCSS lint report at <root>/reports/scsslintReport.json
> gulp scssLintReport
>
> # generate JSHint report at <root>/reports/jshintReport.log
> gulp jsHint
```
