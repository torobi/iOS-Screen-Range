# iOS Screen Range Checker

[Live site](https://torobi.github.io/iOS-Screen-Range/)

## Overview

This web app lets you quickly check the minimum and maximum screen sizes (width and height) of iPhone devices supported by each iOS major version. Select an iOS version from the dropdown, and the supported device screen size range is displayed instantly.

## Features

- Select iOS version via dropdown
- Instantly see the minimum and maximum supported device screen sizes for that version
- Hosted on GitHub Pages

## Usage

1. Visit the [live site](https://torobi.github.io/iOS-Screen-Range/)
2. Choose an iOS version from the "Minimum Deployments" dropdown
3. The minimum and maximum supported device screen sizes for that version will be shown below

## Local Development

### Setup

```sh
pnpm install
```

### Start Dev Server

```sh
pnpm dev
```

### Build for Production

```sh
pnpm build
```

- The production build outputs to the `docs/` directory for GitHub Pages hosting.
- The Vite config sets `base` to `/iOS-Screen-Range/` for correct asset paths.
- On GitHub, set Pages to deploy from the `docs/` folder.
