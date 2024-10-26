const markdownYamlMetaPattern = /^(?:\-\-\-)(.*?)(?:\-\-\-|\.\.\.)/s;
import * as yaml from 'js-yaml';
import hljs from 'highlight.js';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

export const parseMarkdownFile = (markdownContent: string) => {
  // 當正則表達式匹配成功時，metaMatch 會是一個包含匹配結果的數組。
  // 根據正則表達式的結構，這個數組的內容如下：
  // metaMatch[0]：整個匹配到的字符串，包括開頭和結尾的 --- 或 ...。
  // metaMatch[1]：捕獲組 (.*?) 匹配到的內容，即 YAML 元數據的內容。
  const metaMatch = markdownContent.match(markdownYamlMetaPattern);
  if (!metaMatch || metaMatch.length <= 1) {
    return null;
  }

  // 將 metaMatch[1] 的 YAML 元數據解析為物件
  // MarkdownYamlMeta 為 interface，定義了 YAML meta 的結構
  const yamlMeta = yaml.load(metaMatch[1]) as MarkdownYamlMeta;
  // blogContent 是通過從 markdownContent 中移除 YAML meta 來生成的，只有 markdown 內容，不包含 YAML 元數據
  const blogContent = markdownContent.replace(metaMatch[0], '');

  return <MarkdownData>{
    meta: Object.entries(yamlMeta),
    content: transformMarkdown(blogContent)
  };
}

export interface MarkdownYamlMeta {
  title: string;
  date: Date | string;
  category: string;
  tags: string[];
  summary: string;
  author: string;
}

export interface MarkdownData {
  meta: [string, any][]; // MarkdownYamlMeta
  content: string;
}

// // 擴展高亮功能的標記語法
const highlightCode = (code: string, lang: string,) => {
  const language = hljs.getLanguage(lang) ? lang : 'plaintext';
  return hljs.highlight(code, { language }).value;
};

marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight: highlightCode,
}));

// // 將 markdown 轉換為 HTML
export const transformMarkdown = (content: string) => marked.parse(content);
