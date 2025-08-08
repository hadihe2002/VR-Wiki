---
sidebar_position: 17

title: راه‌اندازی Web Server
---

- با کمک این تنظیمات، می‌توانید خروجی WebGL خود از نرم افزار unity (WebXR یا WebGL) را در بستر وب در دسترس قرار دهید. تنظیمات را می‌توانید در این [لینک](https://docs.unity3d.com/2022.3/Documentation/Manual/web-server-config-nodejs.html) مشاهده کنید.
- آسان ترین راه برای این کار راه اندازی وب سرور، استفاده از Express.js در Node.js است. روش‌های Nginx و ... هم قابل انجام است، اما پیچیده تر است.
- بعد از راه اندازی وب‌سرور، راحت ترین راه استفاده از هم گیت و همروش برای دپلوی سایت روی یک دامنه است.
- یک نمونه را می‌توانید در [این لینک](https://github.com/hadihe2002/vr-webgl) مشاهده کنید.

## نصب Node.js

- از [nodejs.org](https://nodejs.org/) آخرین نسخه LTS را دانلود کنید و نصب کنید (با نصب node.js، به طور خودکار npm هم نصب می‌شود).

- تست نصب:

```bas
node --version
npm --version
```

## ایجاد پروژه Server

- پروژه را در محلی که خروجی WebGL قرار دارد، ایجاد کنید. خروجی را در پوشه‌ی output قرار دهید.
- با دستورات زیر، پروژه را ایجاد کنید.

```bash
mkdir unity-webgl-server
cd unity-webgl-server
npm init -y
npm install express
```

## ساختار پروژه

- ساختار فایل‌ها باید به شکل زیر باشد:

```
index.js*  node_modules/  output/  package.json  package-lock.json
```

- ساختار فولدر خروجی output باید به صورت زیر باشد:

```
Build/  index.html  TemplateData/
```

- **نکته مهم**: فایل‌های Web Build شده Unity باید در پوشه `output` کپی شوند.

## فایل Server

- فایل `index.js` را ایجاد کنید و کد زیر را در آن قرار دهید. توجه کنید که buildPath را طبق مسیر خروجی خود قرار دهید:

```javascript
#!/usr/bin/env node

const path = require("path");

const express = require("express");

// Create express application

const app = express();

// Settings

const hostname = "0.0.0.0";

const port = 8080;

const enableCORS = true;

const enableWasmMultithreading = true;

const buildPath = "./output";

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  var path = req.url;

  // Provide COOP, COEP and CORP headers for SharedArrayBuffer

  // multithreading: https://web.dev/coop-coep/

  if (
    enableWasmMultithreading &&
    (path == "/" ||
      path.includes(".js") ||
      path.includes(".html") ||
      path.includes(".htm"))
  ) {
    res.set("Cross-Origin-Opener-Policy", "same-origin");

    res.set("Cross-Origin-Embedder-Policy", "require-corp");

    res.set("Cross-Origin-Resource-Policy", "cross-origin");
  }

  // Set CORS headers

  if (enableCORS) {
    res.set("Access-Control-Allow-Origin", "*");
  }

  // Set content encoding depending on compression

  if (path.endsWith(".br")) {
    res.set("Content-Encoding", "br");
  } else if (path.endsWith(".gz")) {
    res.set("Content-Encoding", "gzip");
  }

  // Explicitly set content type. Files can have wrong content type if build uses compression.

  if (path.includes(".wasm")) {
    res.set("Content-Type", "application/wasm");
  } else if (path.includes(".js")) {
    res.set("Content-Type", "application/javascript");
  } else if (path.includes(".json")) {
    res.set("Content-Type", "application/json");
  } else if (
    path.includes(".data") ||
    path.includes(".bundle") ||
    path.endsWith(".unityweb")
  ) {
    res.set("Content-Type", "application/octet-stream");
  }

  // Ignore cache-control: no-cache

  // when if-modified-since or if-none-match is set

  // because Unity Loader will cache and revalidate manually

  if (
    req.headers["cache-control"] == "no-cache" &&
    (req.headers["if-modified-since"] || req.headers["if-none-match"])
  ) {
    delete req.headers["cache-control"];
  }

  next();
});

app.use("/webgl", express.static(buildPath, { immutable: true }));

const server = app.listen(port, hostname, () => {
  console.log(`serve at http://${hostname}:${port}`);
});

server.addListener("error", (error) => {
  console.error(error);
});

server.addListener("close", () => {
  console.log("Server stopped.");

  process.exit();
});
```

- **سپس با دستور `node ./index.js` می‌توانید برنامه را اجرا کنید و در مسیر /webgl می‌توانید خروجی را ببینید.**

## دپلوی در همروش

- برای دپلوی، لازم است در [همروش](https://console.hamravesh.com) اکانت ایجاد کنید. سپس با اکانت همروش خود در هم گیت لاگین کنید.
- سپس مانند Github، این پروژه را با دستورات `Git` روی همگیت در یک Repository قرار دهید. بعد از انجام تنظیمات، تغییرات و فایل‌ها را روی برنچ مستر Push کنید.
- بعد از آن، لازم است یک Dockerfile در کنار فایل `index.js` ایجاد کنید تا همروش از طریق این فایل، پروژه‌ی شما را ایجاد کند.
- فایل `Dockerfile` ایجاد کنید:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]
```

- دوباره این فایل را نیز در برنچ خود Push کنید. در کنسول همروش خود، یک اپ به کمک **منبع گیت** ایجاد کنید. Repository جدیدی که ایجاد کرده اید را انتخاب کنید.
- حتما **Port سرویس** را `8080` قرار دهید. روی ایجاد اپلیکیشن کلیک کنید.
- صبر کنید تا اپ شما ایجاد شود. سپس از داخل تنظیمات **آدرس دامنه** در اپلیکیشن خود، یک دامنه انتخاب کنید و روی ذخیره‌ی تغییرات کلیک کنید.
- با کلیک روی مشاهده‌ی اپ می‌توانید وبسایت خود را مشاهده کنید!
  ![توضیح تصویر](./img/17-Server-for-Web.png)
