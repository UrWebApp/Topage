const markdownYamlMetaPattern = /^(?:\-\-\-)(.*?)(?:\-\-\-|\.\.\.)/s;
import * as yaml from 'js-yaml';

export const parseMarkdownMeta = (markdownContent: string) => {

  const metaMatch = markdownContent.match(markdownYamlMetaPattern);

  console.log('metaMatch', metaMatch);

  if (!metaMatch || metaMatch.length <= 1) {
    return null;
  }

  const yamlContent = metaMatch[1];

  console.log('yamlContent', metaMatch);

  const yamlMeta = yaml.load(yamlContent) as MarkdownYamlMeta;

  console.log('yamlMeta', yamlMeta);

  const blogContent = markdownContent.replace(yamlContent[0], '');

  console.log('blogContent', blogContent);

  const blogContentChunks = blogContent.split(/<!--\s*content\s*-->/);

  console.log('blogContentChunks', blogContentChunks);

  // 目標 1. 重組上述內容分離出 MD Meta

  // 目標 2. 重組上述內容分離出 文章

  return {};
}

export interface MarkdownYamlMeta {
  title: string;
  date: Date | string;
}

export interface MarkdownMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
}
