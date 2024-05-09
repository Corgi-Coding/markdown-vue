// import { App } from 'vue';
import MarkdownEditor from './components/MarkdownEditor';
// import MarkdownRender from './components/MarkdownRender';

// const components = [MarkdownEditor, MarkdownRender];

// // 定义 install 方法
// const install = (app: App<Element>): void => {
//   // 遍历注册所有组件
//   components.forEach(component =>
//     app.component(component.__name as string, component)
//   );
// };

// export { MarkdownEditor, MarkdownRender };

// const MarkdownVue = {
//   install
// };

export type * from './types';

export default MarkdownEditor;
