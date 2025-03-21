# Koa Playwright Server

English | [中文](README.md)

<img src="https://github.com/pdsuwwz/koa-playwright-server/assets/19891724/51c09e15-93dc-495a-9fc8-b70eba22a560" height="100" align-right />


## Introduction

🎭 Really simple `Playwright` + `ESM` + `Koa` + `TypeScript` + `Tsup` + `Nodemon` + `PM2` + `ESLint (v9)` Starter server.

> * Fast Generate into PDF and images from any webpage.
>
> * Support `merge multiple webpages` into one PDF file, injection of `Cookies`, `Watermark` addition and `Header` and `Footer` insertion

## Legacy Puppeteer Repository

If you were previously using Puppeteer and are looking for the old repository, you can find it here:

Puppeteer repo: [puppeteer-server](https://github.com/pdsuwwz/puppeteer-server)


## 💎 Features

* ✅ Built-in ES Module + TypeScript environment

* 🎨 Separation business logic and Controllers.

* 🛡 Probably the best practice for Playwright project.

* 🧩 Configured routing.

* 🧺 Eslint (v9) configuration.

* ⚡ Fast build with ~~Rollup~~ Tsup.

* 🔌 Extensible PDF watermark, header and footer.

* 🖇️ Supports merging of multiple PDF files.

* 🔥 Based on `Nodemon` HMR.


## Screenshot

* Merge Combine the two websites into a PDF file
> 🗂️ See [Merge Test 1](__test__/axios-browser.html), [Merge Test 2](__test__/axios-node.js)


![image](https://user-images.githubusercontent.com/19891724/159743021-e1f9f528-d6d9-4d6b-b63f-4e71c6b72bdb.png)


## 🔖 Prerequisites

Please make sure that [Node.js](https://nodejs.org/) (>= 20.x) is installed on your operating system.

## Project structure

<pre>
├── src
│   ├── controllers/ ---  Server controllers
│   ├── services/    ---  Server services
│   ├── config.ts    ---  About Environments variable
│   ├── main.ts      ---  Entry file
│   └── routes.ts    ---  Configs for routing controllers <a href="#Routing">👉 Routing</a>
</pre>

## ⚡ Quick Start

### 1. Installation

```bash
pnpm install
```

### 2. Running Development

```bash
pnpm dev
```

### 3. Running Production

The project has built-in a `pm2`, running the `pnpm start` will automatically manage the process by `pm2`.

Run `pnpm build` to build, then run `pnpm start` to start the process managed by `pm2`:

* Build

```bash
pnpm build
```

* Run

```bash
pnpm start # PORT is 8080
# or
node dist/bundle.esm.js # PORT is 5000
```

## API

* `GET /image`

Generate screenshot.

```bash
curl --location --request GET \
'http://localhost:5000/image?url=https://www.google.com' \
--output test-google-image.png
```

* `GET /simple-pdf`

Generate pdf.

```bash
curl --location --request GET \
'http://localhost:5000/simple-pdf?url=https://www.google.com/' \
--output test-simple-pdf.pdf
```

* `POST /pdf`

Generate pdf with elements such as headers and footers.

```bash
curl --location --request POST 'http://localhost:5000/pdf' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'url=http://www.google.com' \
--data-urlencode 'cookies[0].name=token' \
--data-urlencode 'cookies[0].value=9s2d4c16-f072-16eg-b134-0642ap190006' \
--data-urlencode 'cookies[0].path=/' \
--data-urlencode 'cookies[0].domain=www.google.com' --output test-complex-pdf.pdf
```

👆 /pdf request parameters

| Field | Description | Type | Default Value |
| -------- | -------- | -------- | -------- |
| url | Target site url | string | — |
| cookies | Generally used as a website that requires login to access, you can add this field | Array<{ name, value, domain }> | [] |
| hasMargin | If this field is set to true, it means that the generated PDF will contain margins | boolean | true |
| isLandscape | Whether the generated PDF is horizontal | boolean | false |
| hiddenWatermark | Whether to hide watermark | boolean | false |
| attachment | Display the custom header and footer, provided that hasMargin is set to true | { header, footer } | — |


* `POST /combine-pdf`

Merge multiple PDF files into one file.

See [Merge Test 1](__test__/axios-browser.html), [Merge Test 2](__test__/axios-node.js)

👆 /combine-pdf request parameters

| Field | Description | Type | Default Value |
| -------- | -------- | -------- | -------- |
| pdfList | A collection of target websites, the parameter type is an array, and each item in the array is a parameter required by `/pdf` | Array<{ pdfItem }> | [] |


## Routing

In order to make the routing information more readable and transparent, the form of configuration is adopted here.

You can create an `array` and then write the routing meta information into the `array`, and reuse it in the [src/routes.ts](src/routes.ts)

```ts
const routes: Array<RouteConfig> = [
  {
    path: '/',
    method: 'get',
    action: homeController.hello
  },
  // here...
]
```

# License

:v:

[MIT](./LICENSE) License | Copyright © 2020-PRESENT [Wisdom](https://github.com/pdsuwwz)
