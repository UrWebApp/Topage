import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { dasherize } from '@angular-devkit/core/src/utils/strings';
import * as fs from 'fs';
import path = require('path');
// here is a problem which couldn't use ng generate command with parameters
// https://stackoverflow.com/questions/73650610/unknown-argument-when-creating-a-model-with-angular-crud

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function generateMarkdownFile(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.logger.info('📄Start Generating a content');

    const date = new Date();
    const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();

    // The slice(0,19) method is used to extract a substring from the isoDateTime string, starting from the beginning (index 0) and ending just before the 19th character. This effectively trims the string to 2023-10-05T14:48:00, removing the milliseconds and the 'Z' (which indicates UTC time).

    // the replace('T', ' ') method is called on this substring. The replace method searches for the character 'T' (which separates the date and time in the ISO 8601 format) and replaces it with a space. This transforms the string into a more human-readable format: 2023-10-05 14:48:00.
    const fileContent = `
      ---
      title: "${options.name}"
      date: ${isoDateTime.slice(0, 19).replace('T', ' ')}
      category: "${options.category}"
      ---
    `;

    const dasherizeName = `${dasherize(options.name)}`;
    const categoryDir = `projects/ssg-site/public/content/${dasherize(options.category)}`;
    const fileName = `${dasherizeName}.md`;
    const filePath = `${categoryDir}/${fileName}`;
    _context.logger.info(`categoryDir:${categoryDir}`);

    if (!fs.existsSync(categoryDir)) {
       fs.mkdirSync(categoryDir, { recursive: true });
    }

    _context.logger.info(`filePath:${filePath}`);
    tree.create(filePath, fileContent);

    return tree;
  };
}



export function updateRouteTxt(): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    // 從 app.routes.ts 擷取需要加入的靜態頁面 URL
    const routesFilePath = path.resolve('projects/ssg-site/src/app/app.routes.ts');
    const routesFileContent = fs.readFileSync(routesFilePath, 'utf-8');
    const routesMatch = routesFileContent.match(new RegExp('\\[(.*)\\]', 's'));
    const urlPaths = routesMatch?.[1]
      .split(/},\s*{\s*/)
      .filter(routeString => !routeString.includes('resolve'))
      .map(routeString => routeString.match(/path:\s*'([^']*)'/)?.[1])
      .filter(Boolean)
      .map(path => `/${path}`) || [];

    // 從 content 擷取需要加入的 md 檔案路徑
    const baseDir = 'projects/ssg-site/public/content';
    const filePaths = fs.readdirSync(baseDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .flatMap(({ name: categoryName }) =>
        fs.readdirSync(`${baseDir}/${categoryName}`, { withFileTypes: true })
          .filter(dirent => dirent.isFile())
          .map(dirent => `/${categoryName}/${path.parse(dirent.name).name}`)
      );

    // 寫入 routes.txt
    const routesPath = 'projects/ssg-site/routes.txt';
    if (!tree.exists(routesPath)) { tree.create(routesPath, ''); }
    const paths = [...urlPaths, ...filePaths];
    paths.forEach(path => _context.logger.info(`${path}`));
    tree.overwrite(routesPath, paths.join('\n'));

    return tree;
  }
}
