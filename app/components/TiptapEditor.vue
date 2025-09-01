<!-- TiptapEditor.vue -->
<template>
  <div v-if="editor" class="tiptap-editor">
    <!-- Toolbar -->
    <div class="tiptap-toolbar">
      <!-- History -->
      <div class="toolbar-group">
        <button
          type="button"
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().undo()"
          class="toolbar-button"
          title="Undo"
        >
          <Icon name="mdi:undo" class="icon" />
        </button>
        <button
          type="button"
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().redo()"
          class="toolbar-button"
          title="Redo"
        >
          <Icon name="mdi:redo" class="icon" />
        </button>
      </div>

      <!-- Heading -->
      <div class="toolbar-group">
        <div class="relative" ref="headerDropdown">
          <button
            type="button"
            @click="toggleHeaderDropdown"
            class="toolbar-button"
          >
            <span class="w-16">{{ getActiveHeaderText() }}</span>
            <Icon name="mdi:chevron-down" class="icon" />
          </button>
          <div v-if="showHeaderDropdown" class="dropdown-menu">
            <button
              type="button"
              @click="setHeaderLevel('paragraph')"
              :class="{
                'is-active': editor.isActive('paragraph'),
              }"
              class="dropdown-item"
            >
              Normal
            </button>
            <button
              type="button"
              @click="setHeaderLevel(1)"
              :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
              class="dropdown-item heading-1"
            >
              Heading 1
            </button>
            <button
              type="button"
              @click="setHeaderLevel(2)"
              :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
              class="dropdown-item heading-2"
            >
              Heading 2
            </button>
            <button
              type="button"
              @click="setHeaderLevel(3)"
              :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
              class="dropdown-item heading-3"
            >
              Heading 3
            </button>
          </div>
        </div>
      </div>

      <!-- Text Style -->
      <div class="toolbar-group">
        <button
          type="button"
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
          class="toolbar-button"
          title="Bold"
        >
          <Icon name="mdi:format-bold" class="icon" />
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
          class="toolbar-button"
          title="Italic"
        >
          <Icon name="mdi:format-italic" class="icon" />
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleUnderline().run()"
          :class="{ 'is-active': editor.isActive('underline') }"
          class="toolbar-button"
          title="Underline"
        >
          <Icon name="mdi:format-underline" class="icon" />
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
          class="toolbar-button"
          title="Strikethrough"
        >
          <Icon name="mdi:format-strikethrough" class="icon" />
        </button>
      </div>

      <!-- Highlight -->
      <div class="toolbar-group">
        <button
          type="button"
          @click="editor.chain().focus().toggleHighlight().run()"
          :class="{ 'is-active': editor.isActive('highlight') }"
          class="toolbar-button"
          title="Highlight"
        >
          <Icon name="mdi:marker" class="icon" />
        </button>
      </div>

      <!-- Image -->
      <div class="toolbar-group">
        <button
          type="button"
          @click="triggerImageUpload"
          class="toolbar-button"
          title="Upload Image"
        >
          <Icon name="mdi:image-plus" class="icon" />
        </button>
        <input
          type="file"
          ref="imageUpload"
          @change="handleImageUpload"
          class="hidden"
          accept="image/*"
        />
      </div>

      <!-- Align -->
      <div class="toolbar-group">
        <button
          type="button"
          @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
          class="toolbar-button"
          title="Align Left"
        >
          <Icon name="mdi:format-align-left" class="icon" />
        </button>
        <button
          type="button"
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
          class="toolbar-button"
          title="Align Center"
        >
          <Icon name="mdi:format-align-center" class="icon" />
        </button>
        <button
          type="button"
          @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
          class="toolbar-button"
          title="Align Right"
        >
          <Icon name="mdi:format-align-right" class="icon" />
        </button>
      </div>

      <!-- Lists -->
      <div class="toolbar-group">
        <button
          type="button"
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          class="toolbar-button"
          title="Bullet List"
        >
          <Icon name="mdi:format-list-bulleted" class="icon" />
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
          class="toolbar-button"
          title="Ordered List"
        >
          <Icon name="mdi:format-list-numbered" class="icon" />
        </button>
      </div>
    </div>

    <!-- Editor Content -->
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";

export default {
  name: "TiptapEditor",
  components: {
    EditorContent,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Write something...",
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      editor: null,
      showHeaderDropdown: false,
    };
  },
  watch: {
    modelValue(value) {
      if (this.editor) {
        const isSame = this.editor.getHTML() === value;
        if (!isSame) {
          this.editor.commands.setContent(value, false);
        }
      }
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Highlight.configure({
          multicolor: true,
        }),
        Underline,
        Placeholder.configure({
          placeholder: this.placeholder,
        }),
        Image.configure({
          HTMLAttributes: {
            "data-local-image": null,
          },
        }),
        ImageResize.configure({
          inline: true,
        }),
      ],
      content: this.modelValue,
      onUpdate: () => {
        this.$emit("update:modelValue", this.editor.getHTML());
      },
    });

    document.addEventListener("click", this.handleClickOutside, true);
  },
  beforeUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
    document.removeEventListener("click", this.handleClickOutside, true);
  },
  methods: {
    toggleHeaderDropdown() {
      this.showHeaderDropdown = !this.showHeaderDropdown;
    },
    setHeaderLevel(level) {
      if (level === "paragraph") {
        this.editor.chain().focus().setParagraph().run();
      } else {
        this.editor.chain().focus().toggleHeading({ level }).run();
      }
      this.showHeaderDropdown = false;
    },
    getActiveHeaderText() {
      if (this.editor.isActive("heading", { level: 1 })) return "Heading 1";
      if (this.editor.isActive("heading", { level: 2 })) return "Heading 2";
      if (this.editor.isActive("heading", { level: 3 })) return "Heading 3";
      return "Normal";
    },
    handleClickOutside(event) {
      const dropdown = this.$refs.headerDropdown;
      if (dropdown && !dropdown.contains(event.target)) {
        this.showHeaderDropdown = false;
      }
    },
    triggerImageUpload() {
      this.$refs.imageUpload.click();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target.result;
        this.editor
          .chain()
          .focus()
          .setImage({ src, "data-local-image": "true" })
          .run();
      };
      reader.readAsDataURL(file);

      // Reset the file input
      event.target.value = "";
    },
  },
};
</script>

<style>
/* General Editor Styling */
.tiptap-editor {
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

/* Toolbar */
.tiptap-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #d1d5db;
  background-color: #f9fafb;
}

.toolbar-group {
  display: flex;
  align-items: center;
  border-right: 1px solid #d1d5db;
  padding: 0 0.5rem;
}
.toolbar-group:last-child {
  border-right: none;
}

.toolbar-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.375rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #4b5563;
  transition: all 0.2s ease-in-out;
}
.toolbar-button:hover {
  background-color: #e5e7eb;
  color: #111827;
}
.toolbar-button.is-active {
  background-color: #dbeafe;
  color: #1d4ed8;
}
.toolbar-button:disabled {
  color: #9ca3af;
  cursor: not-allowed;
}
.toolbar-button .icon {
  width: 1.25rem;
  height: 1.25rem;
  fill: currentColor;
}

/* Header Dropdown */
.relative {
  position: relative;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  margin-top: 0.25rem;
  width: 12rem;
  background-color: #ffffff;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border: 1px solid #e5e7eb;
  padding: 0.5rem 0;
}
.dropdown-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #1f2937;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.dropdown-item:hover {
  background-color: #f3f4f6;
}
.dropdown-item.is-active {
  background-color: #dbeafe;
  color: #1d4ed8;
  font-weight: 600;
}
.dropdown-item.heading-1 {
  font-size: 1.5rem;
  font-weight: bold;
}
.dropdown-item.heading-2 {
  font-size: 1.25rem;
  font-weight: bold;
}
.dropdown-item.heading-3 {
  font-size: 1.125rem;
  font-weight: bold;
}

/* Editor Content Area */
.tiptap-editor .ProseMirror {
  padding: 1rem;
  min-height: 250px;
  outline: none;
  line-height: 1.6;
  color: #1f2937;
}
.tiptap-editor .ProseMirror:focus {
  outline: none;
}
.tiptap-editor .ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #9ca3af;
  pointer-events: none;
  height: 0;
}

/* Content Styles */
.tiptap-editor .ProseMirror h1,
.tiptap-editor .ProseMirror h2,
.tiptap-editor .ProseMirror h3 {
  margin-top: 1.25em;
  margin-bottom: 0.5em;
  line-height: 1.2;
  font-weight: 600;
}
.tiptap-editor .ProseMirror h1 {
  font-size: 2em;
}
.tiptap-editor .ProseMirror h2 {
  font-size: 1.5em;
}
.tiptap-editor .ProseMirror h3 {
  font-size: 1.25em;
}
.tiptap-editor .ProseMirror p {
  margin-bottom: 1em;
}
.tiptap-editor .ProseMirror ul,
.tiptap-editor .ProseMirror ol {
  padding-left: 1.5rem;
  margin-bottom: 1em;
}
.tiptap-editor .ProseMirror li > p {
  margin-bottom: 0.25em;
}
.tiptap-editor .ProseMirror blockquote {
  border-left: 3px solid #d1d5db;
  margin-left: 0;
  margin-right: 0;
  padding-left: 1rem;
  font-style: italic;
  color: #6b7280;
}
.tiptap-editor .ProseMirror mark {
  background-color: #fef08a;
  padding: 0.1em 0.3em;
  border-radius: 0.2em;
}
</style>
