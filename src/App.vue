<script setup lang="ts">
import { ref } from 'vue';
import MarkdownEditor from './components/MarkdownEditor/index';
import MarkdownRender from './components/MarkdownRender/index';

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
