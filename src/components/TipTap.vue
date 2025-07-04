<template>
  <div>
    <!-- Barra de herramientas con botones -->
    <div class="flex" v-if="!props.visitante">
      <button
        @click="editor?.chain().focus().toggleBold().run()"
        :class="{ 'bg-purple-500 text-white': isBoldActive }"
        class="px-2 py-1 border"
      >
        <svg-icon type="mdi" :path="path2"></svg-icon>
      </button>
      <button
        @click="editor?.chain().focus().toggleItalic().run()"
        :class="{ 'bg-purple-500 text-white': isItalicActive }"
        class="px-2 py-1 border"
      >
        <svg-icon type="mdi" :path="path"></svg-icon>
      </button>
      <button
        @click="editor?.chain().focus().toggleBulletList().run()"
        :class="{ 'bg-purple-500 text-white': isBulletListActive }"
        class="px-2 py-1 border"
      >
        <svg-icon type="mdi" :path="path3"></svg-icon>
      </button>
    </div>

    <editor-content :editor="editor" class="border rounded p-2"/>

  </div>

</template>

<script setup>
import { ref, watch, watchEffect, onMounted, onBeforeUnmount } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import svgIcon from '@jamescoyle/vue-icon';
import { mdiFormatItalic, mdiFormatBold, mdiFormatListBulleted } from '@mdi/js';

const path= mdiFormatItalic
const path2 = mdiFormatBold
const path3 = mdiFormatListBulleted

// Definir props y emit
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  visitante: {
    type: Boolean,
    required: true
  }
});
const emit = defineEmits(['update:modelValue']);

// Editor reactivo
const editor = ref(null);

// Estados para detectar estilos activos
const isBoldActive = ref(false);
const isItalicActive = ref(false);
const isBulletListActive = ref(false);

// Watch para sincronizar el contenido con modelValue
watch(
  () => props.modelValue,
  (value) => {
    if (editor.value && editor.value.getHTML() !== value) {
      editor.value.commands.setContent(value, false);
    }
  }
);

// Inicializar el editor
onMounted(() => {

  editor.value = new Editor({
    extensions: [StarterKit],
    content: props.modelValue,
    editable: !props.visitante,
    editorProps: {
      attributes: {
        class: props.visitante ? 'disabled-editor' : '',
        'aria-disabled': props.visitante ? 'true' : 'false'
      }
    },
    onUpdate: ({ editor }) => {
      if (!props.visitante) {
        emit('update:modelValue', editor.getHTML());
      }
    }
  });

  // Detectar cambios en los estilos activos
  watchEffect(() => {
    if (editor.value) {
      isBoldActive.value = editor.value.isActive('bold');
      isItalicActive.value = editor.value.isActive('italic');
      isBulletListActive.value = editor.value.isActive('bulletList'); // Detectar lista desordenada
    }
  });
  
});

// Destruir el editor al desmontar
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>
  
  <style>
  /* Basic editor styles */
  .tiptap {
    :first-child {
      margin-top: 0;
    }
  
    /* List styles */
    ul,
    ol {
      padding: 0 1rem;
      margin: 1.25rem 1rem 1.25rem 0.4rem;
  
      li p {
        margin-top: 0.25em;
        margin-bottom: 0.25em;
      }
    }
  
    /* Heading styles */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.1;
      margin-top: 2.5rem;
      text-wrap: pretty;
    }
  
    h1,
    h2 {
      margin-top: 3.5rem;
      margin-bottom: 1.5rem;
    }
  
    h1 {
      font-size: 1.4rem;
    }
  
    h2 {
      font-size: 1.2rem;
    }
  
    h3 {
      font-size: 1.1rem;
    }
  
    h4,
    h5,
    h6 {
      font-size: 1rem;
    }
  
    /* Code and preformatted text styles */
    code {
      background-color: var(--purple-light);
      border-radius: 0.4rem;
      color: var(--black);
      font-size: 0.85rem;
      padding: 0.25em 0.3em;
    }
  
    pre {
      background: var(--black);
      border-radius: 0.5rem;
      color: var(--white);
      font-family: 'JetBrainsMono', monospace;
      margin: 1.5rem 0;
      padding: 0.75rem 1rem;
  
      code {
        background: none;
        color: inherit;
        font-size: 0.8rem;
        padding: 0;
      }
    }
  
    blockquote {
      border-left: 3px solid var(--gray-3);
      margin: 1.5rem 0;
      padding-left: 1rem;
    }
  
    hr {
      border: none;
      border-top: 1px solid var(--gray-2);
      margin: 2rem 0;
    }
    p {
        margin: 0 0 1em;
      }
      
    ul {
        padding-left: 1.5em;
        list-style-type: disc;
      }
      
    li {
        margin-bottom: 0.5em;
      }

      /* Evitar borde de focus en el editor */
    .ProseMirror:focus {
      outline: none !important;
    }

  }
  </style>
  