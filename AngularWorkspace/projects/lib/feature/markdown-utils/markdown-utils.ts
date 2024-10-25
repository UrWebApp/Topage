const markdownYamlMetaPattern = /^(?:\-\-\-)(.*?)(?:\-\-\-|\.\.\.)/s;
import * as yaml from 'js-yaml';

export const parseMarkdownFile = (markdownContent: string) => {

//   當正則表達式匹配成功時，metaMatch 會是一個包含匹配結果的數組。根據正則表達式的結構，這個數組的內容如下：

// metaMatch[0]：整個匹配到的字符串，包括開頭和結尾的 --- 或 ...。
// metaMatch[1]：捕獲組 (.*?) 匹配到的內容，即 YAML 元數據的內容。
  const metaMatch = markdownContent.match(markdownYamlMetaPattern);

  console.log('metaMatch', metaMatch);

  if (!metaMatch || metaMatch.length <= 1) {
    return null;
  }

  // 將 metaMatch[1] 的 YAML 元數據解析為物件
  // MarkdownYamlMeta 為 interface，定義了 YAML meta 的結構
  const yamlMeta = yaml.load(metaMatch[1]) as MarkdownYamlMeta;

  console.log('yamlMeta', yamlMeta);
  // blogContent 是通過從 markdownContent 中移除 YAML meta 來生成的，只有 markdown 內容，不包含 YAML 元數據
  const blogContent = markdownContent.replace(metaMatch[0], '');

  console.log('blogContent', blogContent);


  return <MarkdownData>{
    meta: yamlMeta,
    content: blogContent
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
  meta: MarkdownYamlMeta;
  content: string;
}
