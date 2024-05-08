import type { App } from 'vue';
import MarkdownRender from './src/MarkdownRender.vue';

// 使用install方法，在app.use挂载
MarkdownRender.install = (app: App) => {
  app.component(MarkdownRender.__name as string, MarkdownRender);
};

export default MarkdownRender;
