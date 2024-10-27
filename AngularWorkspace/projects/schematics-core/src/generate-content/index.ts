import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { dasherize } from '@angular-devkit/core/src/utils/strings';

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
    const fileName = `${dasherizeName}.md`;
    const filePath = `projects/ssg-site/public/content/${fileName}`;

    _context.logger.info(`filePath:${filePath}`);
    tree.create(filePath, fileContent);

    return tree;
  };
}

// projects/ssg-site/src/app/app.routes.ts

import * as fs from 'fs';
import path = require('path');

export function updateRouteTxt(): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const routesFile = fs.readFileSync(path.resolve('projects/ssg-site/src/app/app.routes.ts'), 'utf-8');
    const routesFileString = routesFile.match(new RegExp('\\[(.*)\\]', 's')) || [];
    const urlPaths = routesFileString[1]
      .split(/},\s*{\s*/)
      .map((routesString) => routesString.includes('resolve') ? [] : routesString.match(/path:\s*'([^']*)'/) || []);
    urlPaths.forEach((path) => _context.logger.info(`\n${path}`));

    // const filePaths = fs.readdirSync('projects/ssg-site/public/content', { withFileTypes: true })
    //   .filter(dirent => dirent.isDirectory())
    //   .flatMap(category => {
    //     const categoryName = category.name;
    //     const files = fs.readdirSync(`projects/ssg-site/public/content/${categoryName}`, { withFileTypes: true })
    //       .filter(dirent => dirent.isFile())
    //       .map(dirent => `/${categoryName}/${path.basename(dirent.name, '.md')}`);
    //     return files;
    //   });

    // // 顯示結果
    // filePaths.forEach(filePath => _context.logger.info(`file:${filePath}`));

    // const routesPath = 'projects/ssg-site/routes.txt';

    // if (!tree.exists(routesPath)) {
    //   tree.create(routesPath, '');
    // }
    // tree.overwrite(routesPath, filePaths.join('\n'));
    return tree;
  }
}
