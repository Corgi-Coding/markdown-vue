# corgicoding-markdown-vue

Vue components based on monaco and markdown-it.
Compatible with vue3.x

## global use

First, you need to install this package on your project.

```powershell
npm install @corgicoding/markdown-vue -S

# OR
pnpm install @corgicoding/markdown-vue -S
```

After that, you can import it globally in main.js / main.ts.

```js
import markdownVue from '@corgicoding/markdown-vue';
createApp(App).use(markdownVue).mount('#app');
```

### on demand Import

Of course, you can import on demand in the following ways

- MarkdownEditor

```js
import { MarkdownEditor } from '@corgicoding/markdown-vue';
```

- MarkdownRender

```js
import { MarkdownRender } from '@corgicoding/markdown-vue';
```

### how to use

this is a example

```vue
<script setup lang="ts">
import { ref } from 'vue';

const textValue = ref(`> *corgicoding: Edit here...*
`);
</script>

<template>
  <div style="width: 100%; height: 100%; position: relative; display: flex">
    <div style="width: 50%; height: 100%; position: relative">
      <MarkdownEditor
        v-model="textValue"
        :options="{
          fontSize: 16,
          theme: 'vs'
        }"
      ></MarkdownEditor>
    </div>

    <MarkdownRender v-model="textValue"></MarkdownRender>
  </div>
</template>

<style></style>
```

### dev

more detail: https://github.com/microsoft/monaco-editor/tree/main/webpack-plugin
monaco docs: https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-esm.md#integrating-the-esm-version-of-the-monaco-editor

sometimes, you should install `monaco-editor-webpack-plugin` ,

```json
  "devDependencies": {
    "monaco-editor-webpack-plugin": "^4.1.1"
  },
```

and add the following code in `vue.config.js`

```js
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  // ......
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: [
          'javascript',
          'css',
          'html',
          'typescript',
          'json',
          'markdown'
        ]
      })
    ]
  }
};
```

## Components

```ts
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
```

### MarkdownEditor

```ts
const props = defineProps<{
  modelValue?: string;
  options?: EditorOptions;
  forceOptions?: monaco.editor.IStandaloneEditorConstructionOptions;
  actions?: EditorAction[];
}>();

const defaultOptions: EditorOptions = {
  readonly: false,
  language: 'markdown',
  theme: 'vs',
  minimap: false,
  scrollbarSize: 10,
  wordWrap: 'on',
  automaticLayout: true,
  autoIndent: 'none',
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false, // 只读
  cursorStyle: 'line', // 光标样式
  glyphMargin: true, // 字形边缘
  useTabStops: false,
  fontSize: 16 // 字体大小
};

const Emits = defineEmits(['update:modelValue', 'editorScroll']);

const execMethods = (
  fn: (editor: monaco.editor.IStandaloneCodeEditor) => void
) => {
  if (monacoEditor.value) {
    fn(monacoEditor.value);
  }
};

defineExpose({
  monacoEditor,
  textValue,
  execMethods
});
```

### RenderPage

```ts
const props = withDefaults(
  defineProps<{
    modelValue: string;
    plugins?: Array<any>;
    options?: Options;
  }>(),
  {
    plugins: () => [],
    options: () => ({
      html: true,
      linkify: true,
      break: true,
      highlight: function (str: string, lang: any) {
        if (lang && highlight.getLanguage(lang)) {
          try {
            return (
              '<pre class="hljs"><code>' +
              highlight.highlight(lang, str, true).value +
              '</code></pre>'
            );
            // eslint-disable-next-line no-empty
          } catch (__) {}
        }

        return (
          '<pre class="hljs"><code>' +
          highlight.highlight('js', str, true).value +
          '</code></pre>'
        ); // Use additional default escaping
      }
    })
  }
);

const Emits = defineEmits(['update:modelValue']);

const execMethods = (fn: (renderInstance: MarkdownIt) => void) => {
  if (renderInstance.value) {
    fn(renderInstance.value);
  }
};

defineExpose({
  renderInstance,
  execMethods
});
```
