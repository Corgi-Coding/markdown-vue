<script setup lang="ts">
import MarkdownIt, { Options } from 'markdown-it';
import highlight from 'highlight.js';
import { computed, onMounted, ref, shallowRef, watch } from 'vue';

defineOptions({
  name: 'MarkdownRender'
});

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

const textValue = computed({
  get: () => {
    return props.modelValue || '';
  },
  set(newValue: string) {
    Emits('update:modelValue', newValue);
  }
});

const containerRef = ref<HTMLDivElement>();
const renderInstance = shallowRef<MarkdownIt>();
onMounted(() => {
  if (props.options) {
    renderInstance.value = new MarkdownIt(props.options);
  } else {
    renderInstance.value = new MarkdownIt();
  }

  if (props.plugins instanceof Array && props.plugins.length > 0) {
    props.plugins.forEach(pluginItem => {
      try {
        renderInstance.value?.use(pluginItem);
      } catch (error) {
        console.error('markdown-render use plugin error', error);
      }
    });
  }
});

watch(
  [() => textValue.value, () => renderInstance.value],
  ([newText, instance]) => {
    if (instance && containerRef.value) {
      containerRef.value.innerHTML = instance.render(newText || '');
    }
  }
);

const execMethods = (fn: (renderInstance: MarkdownIt) => void) => {
  if (renderInstance.value) {
    fn(renderInstance.value);
  }
};

defineExpose({
  renderInstance,
  execMethods
});
</script>

<template>
  <div class="cc__markdown-render">
    <div id="cc__markdown-render__container" ref="containerRef"></div>
  </div>
</template>

<style>
.cc__markdown-render,
.cc__markdown-render__container {
  width: 100%;
  height: 100%;
  min-height: 200px;
  min-width: 200px;
  position: relative;
}
</style>
