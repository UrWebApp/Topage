import { dasherize } from '@angular-devkit/core/src/utils/strings';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import path = require('path');

interface Options {
  name: string;
  category: string;
}
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function generateMarkdownFile(options: Options): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.logger.info('📄Start Generating a content');
    const dasherizeName = `${dasherize(options.name)}`;
    const fileName = `${dasherizeName}.md`;
    const filePath = ['public', 'content', dasherizeName, fileName].join(path.sep);

    const date = new Date();
    const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();

    // The slice(0,19) method is used to extract a substring from the isoDateTime string, starting from the beginning (index 0) and ending just before the 19th character. This effectively trims the string to 2023-10-05T14:48:00, removing the milliseconds and the 'Z' (which indicates UTC time).

    // the replace('T', ' ') method is called on this substring. The replace method searches for the character 'T' (which separates the date and time in the ISO 8601 format) and replaces it with a space. This transforms the string into a more human-readable format: 2023-10-05 14:48:00.
    const fileContent = `---
    title: "${options.name}"
    date: ${isoDateTime.slice(0,19).replace('T', ' ')}
    ---

    write your content here
`;
    tree.create(filePath, fileContent);
    return tree;
  };
}
