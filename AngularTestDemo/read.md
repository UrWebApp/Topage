1. 測試類型與定位
單元測試（Unit Testing）：聚焦在最小單位（函式、Service、Component）是否符合預期行為，速度快、易除錯。 
Peerbits

整合測試（Integration Testing）：驗證多個單元間的互動，如 Service 與 Component 的資料流，模擬真實場景下模組間的協作。 
Peerbits

端對端測試（E2E Testing）：模擬使用者在瀏覽器上的操作，檢查整個應用程式從前端到後端的完整流程。 
Peerbits

2. 核心工具與框架
Jasmine：撰寫單元測試用的 BDD 風格框架，提供 describe、it、expect 等 API。 
Elite Ionic

Karma：測試執行器，可在多種瀏覽器環境中運行 Jasmine 或其它測試規格。 
Elite Ionic

Angular TestBed：Angular 官方提供的測試模組建構工具，用於設定 Component 的測試環境與相依注入。 
Peerbits

Protractor：原生支援 Angular 同步機制的 E2E 框架，但自 Angular 12 後已不再預設捆綁。 
Cypress Documentation

Cypress：現代化的 E2E 測試框架，支援實時重載、強大除錯能力，正快速取代 Protractor。 
Cypress Documentation

3. 其他常見工具與實作細節
測試指令：ng test（執行單元測試）、ng e2e（執行 E2E 測試，預設 Protractor） 
Peerbits

代碼覆蓋（Code Coverage）：透過 Istanbul（Karma coverage）或 --code-coverage 參數，分析測試覆蓋率。 
Peerbits

Mock 與 Spies：使用 Jasmine 的 spyOn() 模擬 Service 方法呼叫，或用 TestBed 提供假物件。 
Elite Ionic

CI 整合：在 Azure DevOps、Jenkins、GitHub Actions 中加入測試步驟，並收集覆蓋率報表。