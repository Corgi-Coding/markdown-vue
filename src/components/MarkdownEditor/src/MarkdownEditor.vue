<script setup lang="ts">
/**
 * Using Vite
 * @link https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-esm.md#using-vite
 */
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// 语言 node_modules/monaco-editor/esm/metadata.js
// json
// import 'monaco-editor/esm/vs/language/json/monaco.contribution';
// import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
// // js
// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
// // ts
// import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution';
// import 'monaco-editor/esm/vs/language/typescript/monaco.contribution';
// import TSWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import 'monaco-editor/esm/vs/basic-languages/markdown/markdown.contribution';

self.MonacoEnvironment = {
  getWorker() {
    // if (label === 'json') {
    //   return new JsonWorker();
    // }
    // if (label === 'typescript' || label === 'javascript') {
    //   return new TSWorker();
    // }
    return new EditorWorker();
  }
};

import { computed, onMounted, ref, shallowRef } from 'vue';
import { EditorAction, EditorOptions } from '../../../types';

defineOptions({
  name: 'MarkdownEditor'
});

const containerRef = ref();
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

const mergeOptions = {
  ...defaultOptions,
  ...props.options
};

const editorOptions = {
  selectOnLineNumbers: mergeOptions.selectOnLineNumbers,
  roundedSelection: mergeOptions.roundedSelection,
  readOnly: mergeOptions.readOnly, // 只读
  cursorStyle: mergeOptions.cursorStyle, // 光标样式
  glyphMargin: mergeOptions.glyphMargin, // 字形边缘
  useTabStops: mergeOptions.useTabStops,
  fontSize: mergeOptions.fontSize, // 字体大小
  // vs, hc-black, or vs-dark
  theme: mergeOptions.theme,
  autoIndent: mergeOptions.autoIndent, // 自动布局
  language: mergeOptions.language,
  minimap: {
    enabled: mergeOptions.minimap
  },
  scrollbar: {
    useShadows: false,
    // more see https://github.com/microsoft/monaco-editor/blob/main/test/playground.generated/customizing-the-appearence-scrollbars.html

    verticalScrollbarSize: mergeOptions.scrollbarSize,
    horizontalScrollbarSize: mergeOptions.scrollbarSize
  },
  automaticLayout: mergeOptions.automaticLayout, // 自动布局
  wordWrap: mergeOptions.wordWrap
};

const Emits = defineEmits(['update:modelValue', 'editorScroll']);

const textValue = computed({
  get: () => {
    return props.modelValue || '';
  },
  set(newValue: string) {
    Emits('update:modelValue', newValue);
  }
});

const monacoEditor = shallowRef<monaco.editor.IStandaloneCodeEditor>();
onMounted(() => {
  if (!containerRef.value) {
    console.error('monaco editor dom error!');
    return;
  }

  const initOptions = props.forceOptions ? props.forceOptions : editorOptions;

  monacoEditor.value = monaco.editor.create(containerRef.value, {
    value: textValue.value,
    ...initOptions
  });

  monacoEditor.value?.getModel()?.onDidChangeContent(() => {
    Emits('update:modelValue', monacoEditor.value?.getValue());
    monacoEditor.value?.layout();
  });

  monacoEditor.value?.onDidScrollChange(() => {
    const scrollInf = {
      height: monacoEditor.value?.getScrollHeight(),
      top: monacoEditor.value?.getScrollTop()
    };
    Emits('editorScroll', scrollInf);
  });
});

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
</script>

<template>
  <div class="cc__monaco-container">
    <div ref="containerRef" class="cc__monaco-editor"></div>
  </div>
</template>

<style>
.cc__monaco-container,
.cc__monaco-editor {
  width: 100%;
  height: 100%;
  min-height: 200px;
  min-width: 200px;
  position: relative;
}
</style>
