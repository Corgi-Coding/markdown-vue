import type { App } from 'vue';
import MarkdownEditor from './src/MarkdownEditor.vue';

// 使用install方法，在app.use挂载
MarkdownEditor.install = (app: App) => {
  app.component(MarkdownEditor.__name as string, MarkdownEditor);
};

export default MarkdownEditor;
