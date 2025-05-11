1. 測試類型與流程
單元測試（Unit Testing）：使用獨立的測試專案或 .cs 檔，聚焦於單一方法或類別的行為。 
LambdaTest

整合測試（Integration Testing）：測試與資料庫、Web API 或第三方服務的互動，可搭配 Docker Container 模擬實際環境。 
Microsoft Learn

AAA 模式：Arrange（準備）、Act（執行）、Assert（驗證），為主流的測試編寫流程。 
Medium

2. 核心框架與工具
xUnit.Net：現今 .NET 社群推薦的測試框架，與 .NET CLI 深度整合。 
Microsoft Learn

NUnit：歷史悠久，具備豐富特性與社群支援，同樣可透過 .NET CLI 或 Visual Studio 執行。 
LambdaTest

MSTest：微軟官方自帶框架，整合度高但擴展性略低於前兩者。 
BrowserStack

Mocking Libraries：Moq、NSubstitute、FakeItEasy 等，用於模擬相依物件與行為。 
BrowserStack

Coverlet：跨平台的程式碼覆蓋工具，結合 ReportGenerator 生成直觀報表。 
Microsoft Learn

3. 進階測試實踐
Data-Driven Testing：利用 xUnit 的 [Theory]／[InlineData] 或 MSTest 的 [DataRow] 測試多組資料。 
BrowserStack

持續整合（CI）：在 Azure Pipelines、GitHub Actions 中安裝 .NET Core 任務，執行 dotnet test --collect:"XPlat Code Coverage"，並整合 Badge。 
Microsoft Learn

Mock vs Stub：了解何時使用嚴格驗證呼叫的 Mock (e.g. Moq) 與僅提供假回傳值的 Stub。 
Medium

行為驅動（BDD）拓展：可額外學習 SpecFlow 結合 Gherkin 語法，撰寫可讀性更高的測試案例。