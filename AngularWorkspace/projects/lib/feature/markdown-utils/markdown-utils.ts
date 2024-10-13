const markdownYamlMetaPattern = /^(?:\-\-\-)(.*?)(?:\-\-\-|\.\.\.)/s;
import * as yaml from 'js-yaml';

export const parseMarkdownMeta = (markdownContent: string) => {

  const metaMatch = markdownContent.match(markdownYamlMetaPattern);

  if (!metaMatch || metaMatch.length <= 1) {
    return null;
  }

  const yamlContent = metaMatch[1];
  const yamlMeta = yaml.load(yamlContent) as MarkdownYamlMeta;
  const blogContent = markdownContent.replace(yamlContent[0], '');
  const blogContentChunks = blogContent.split(/<!--\s*content\s*-->/);

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
