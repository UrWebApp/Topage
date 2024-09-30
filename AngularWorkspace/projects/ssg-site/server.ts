import { APP_BASE_HREF } from '@angular/common'; // 從 Angular 的公共模組引入 APP_BASE_HREF，這是用於設置應用的基本路徑。
import { CommonEngine } from '@angular/ssr'; // 引入 CommonEngine，這是 Angular 伺服器端渲染的引擎。
import express from 'express'; // 引入 Express 框架，用於建立伺服器。
import { fileURLToPath } from 'node:url'; // 從 Node.js 的 URL 模組引入 fileURLToPath，用於處理 URL。
import { dirname, join, resolve } from 'node:path'; // 引入路徑處理函數。
import bootstrap from './src/main.server'; // 引入伺服器啟動檔。

// 將 Express 應用導出，以便用於無伺服器函數。
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url)); // 獲取伺服器檔案所在目錄。
  const browserDistFolder = resolve(serverDistFolder, '../browser'); // 獲取瀏覽器端分發檔案的目錄。
  const indexHtml = join(serverDistFolder, 'index.server.html'); // 定義伺服器端 HTML 的路徑。

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html'); // 設定視圖引擎為 HTML。
  server.set('views', browserDistFolder); // 設定視圖檔案的目錄。

  // 例子：Express REST API 端點
  // server.get('/api/**', (req, res) => { });

  // 提供靜態檔案來自 /browser 目錄
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y', // 設定靜態檔案的快取時間為一年。
    index: 'index.html', // 設定預設檔案為 index.html。
  }));

  // 所有常規路由使用 Angular 引擎
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req; // 解構請求資訊。

    commonEngine
      .render({
        bootstrap, // 提供 bootstrap 函數來啟動 Angular 應用。
        documentFilePath: indexHtml, // 指定伺服器端 HTML 檔案。
        url: `${protocol}://${headers.host}${originalUrl}`, // 建立完整的請求 URL。
        publicPath: browserDistFolder, // 設定公共路徑為瀏覽器檔案目錄。
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }], // 提供基本路徑。
      })
      .then((html) => res.send(html)) // 渲染 HTML 並回傳給客戶端。
      .catch((err) => next(err)); // 錯誤處理，將錯誤傳遞給下一個中介函數。
  });

  return server; // 返回建立的 Express 伺服器實例。
}

function run(): void {
  const port = process.env['PORT'] || 4000; // 設定伺服器運行的端口，默認為 4000。

  // 啟動 Node 伺服器
  const server = app(); // 調用 app 函數獲取伺服器實例。
  server.listen(port, () => { // 開始監聽指定端口。
    console.log(`Node Express server listening on http://localhost:${port}`); // 在控制台輸出伺服器運行的訊息。
  });
}

run(); // 執行 run 函數，啟動伺服器。
