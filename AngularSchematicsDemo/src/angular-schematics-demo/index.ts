import { apply, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.

// Tree：資料的樹狀結構描述
// Rule：將 Tree 轉換另外一個 Tree 的行為 ( function angularSchematicsDemo )
// Source： Tree 樹狀結構以外的其他來源結構，通常與 Tree 合併，實際回傳新的 Tree 的某個函式。

export function angularSchematicsDemo(_options: any): Rule {
  // _options：包含下的參數指令、別的 Schematics 所傳入的參數，可以使用 JSON Schema 驗證確保具有適當的預設值與類型
  return (
    tree: Tree, 
    _context: SchematicContext
  ) => {

    const sourceTemplates = url('./templates'); // 使用範本

    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ..._options, // 使用者所輸入的參數
      }),
      move(`./dist/${_options.name}`)  // Move files to the target path
    ]);

    return mergeWith(sourceParametrizedTemplates);

    // 產生一個檔案名稱為使用者所輸入的 --name 參數的值，沒輸入則為 'hello' 的檔案，檔案內容為 'world'
    tree.create(_options.name || 'hello', 'world');
    return tree;
  };
}
