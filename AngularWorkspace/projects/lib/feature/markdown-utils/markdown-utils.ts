import * as yaml from 'js-yaml';
import hljs from 'highlight.js';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

// 正則表達式：匹配 YAML 元數據
const markdownYamlMetaPattern = /^(?:\-\-\-)(.*?)(?:\-\-\-|\.\.\.)/s;

// 高亮語法功能
const highlightCode = (code: string, lang: string) => {
  const language = hljs.getLanguage(lang) ? lang : 'plaintext';
  return hljs.highlight(code, { language }).value;
};

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight: highlightCode,
  })
);

// 轉換 Markdown 為 HTML
const transformMarkdown = (content: string) => marked.parse(content);

// 抽離 YAML meta 資料的解析
const parseYamlMeta = (markdownContent: string): { meta: MarkdownYamlMeta; content: string } | null => {
  // 當正則表達式匹配成功時，metaMatch 會是一個包含匹配結果的數組。
  // 根據正則表達式的結構，這個數組的內容如下：
  // metaMatch[0]：整個匹配到的字符串，包括開頭和結尾的 --- 或 ...。
  // metaMatch[1]：捕獲組 (.*?) 匹配到的內容，即 YAML 元數據的內容。
  const metaMatch = markdownContent.match(markdownYamlMetaPattern);
  if (!metaMatch || metaMatch.length <= 1) return null;

  // 將 metaMatch[1] 的 YAML 元數據解析為物件
  // MarkdownYamlMeta 為 interface，定義了 YAML meta 的結構
  const yamlMeta = yaml.load(metaMatch[1]) as MarkdownYamlMeta;
  // blogContent 是從 markdownContent 中移除 YAML meta 生成，只有 markdown 內容不含 YAML 元數據
  const content = markdownContent.replace(metaMatch[0], '');

  return { meta: yamlMeta, content };
};

// 解析整個 Markdown 文件，分離 YAML meta 和內容
export const parseMarkdownFile = (markdownContent: string) => {
  const parsedData = parseYamlMeta(markdownContent);
  if (!parsedData) return null;

  return <MarkdownData>{
    meta: parsedData.meta,
    content: transformMarkdown(parsedData.content),
  };
};

// 定義接口
export interface MarkdownYamlMeta {
  title: string;
  date: Date | string;
  category: string;
  tags: string[];
  summary: string;
  author: string;
}

export interface MarkdownData {
  meta: MarkdownYamlMeta ;
  content: string;
}
