export interface EditorOptions {
  readonly?: boolean;
  language?: string;
  theme?: string;
  minimap?: boolean;
  scrollbarSize?: number;
  wordWrap?: 'off' | 'on' | 'wordWrapColumn' | 'bounded' | undefined;
  automaticLayout?: boolean;
  autoIndent?: 'none' | 'keep' | 'brackets' | 'advanced' | 'full' | undefined;
  selectOnLineNumbers?: boolean;
  roundedSelection?: boolean;
  readOnly?: boolean; // 只读
  cursorStyle?:
    | 'line'
    | 'block'
    | 'underline'
    | 'line-thin'
    | 'block-outline'
    | 'underline-thin'
    | undefined; // 光标样式
  glyphMargin?: boolean; // 字形边缘
  useTabStops?: boolean;
  fontSize?: number; // 字体大小
  [key: string]: any;
}

export interface EditorAction {
  id: string;
  label: string;
  groupId: string;
  handler: () => void;
}

export type { Options as MarkdownItOptions } from 'markdown-it';
