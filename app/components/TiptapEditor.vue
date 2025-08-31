<template>
  <div
    v-if="editor"
    class="tiptap-editor w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white"
  >
    <!-- Toolbar -->
    <div class="tiptap-toolbar bg-gray-50 border-b border-gray-200 px-3 py-2">
      <div class="flex items-center gap-1 flex-wrap">
        <!-- Undo/Redo -->
        <button
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().undo()"
          class="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Undo"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <button
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().redo()"
          class="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Redo"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Divider -->
        <div class="h-5 w-px bg-gray-300 mx-1"></div>

        <!-- Header Dropdown -->
        <div class="relative inline-block text-left">
          <button
            @click="toggleHeaderDropdown"
            :class="[
              'px-2.5 py-1.5 text-sm font-medium transition-all duration-200 flex items-center gap-1.5 rounded hover:bg-gray-200',
              editor.isActive('heading')
                ? 'text-blue-700 bg-blue-50'
                : 'text-gray-700',
            ]"
          >
            <span>{{ getActiveHeaderText() }}</span>
            <svg
              class="w-3 h-3 transition-transform"
              :class="{ 'rotate-180': showHeaderDropdown }"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="showHeaderDropdown"
            class="absolute left-0 z-10 mt-1 w-44 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="py-1">
              <button
                @click="setHeaderLevel('paragraph')"
                :class="[
                  editor.isActive('paragraph')
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-900 hover:bg-gray-100',
                  'group flex items-center w-full px-3 py-1.5 text-sm',
                ]"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6h16v2H2V6zm0 4h16v2H2v-2z" />
                </svg>
                Normal Text
              </button>
              <button
                @click="setHeaderLevel(1)"
                :class="[
                  editor.isActive('heading', { level: 1 })
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-900 hover:bg-gray-100',
                  'group flex items-center w-full px-3 py-1.5 text-sm font-bold',
                ]"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 4h16v2H2V4zm0 4h16v2H2V8zm0 4h16v2H2v-2z" />
                </svg>
                Heading 1
              </button>
              <button
                @click="setHeaderLevel(2)"
                :class="[
                  editor.isActive('heading', { level: 2 })
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-900 hover:bg-gray-100',
                  'group flex items-center w-full px-3 py-1.5 text-sm font-semibold',
                ]"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 4h16v2H2V4zm0 4h12v2H2V8zm0 4h16v2H2v-2z" />
                </svg>
                Heading 2
              </button>
              <button
                @click="setHeaderLevel(3)"
                :class="[
                  editor.isActive('heading', { level: 3 })
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-900 hover:bg-gray-100',
                  'group flex items-center w-full px-3 py-1.5 text-sm font-medium',
                ]"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 4h16v2H2V4zm0 4h8v2H2V8zm0 4h16v2H2v-2z" />
                </svg>
                Heading 3
              </button>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="h-5 w-px bg-gray-300 mx-1"></div>

        <!-- Bold -->
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :class="[
            'p-1.5 rounded transition-all',
            editor.isActive('bold')
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200',
          ]"
          title="Bold"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M6 4.75c0-.69.56-1.25 1.25-1.25h2.5C11.44 3.5 13 5.06 13 7s-1.56 3.5-3.25 3.5h-2.5v2.25H8.5c1.38 0 2.5 1.12 2.5 2.5S9.88 17.75 8.5 17.75h-3.25c-.69 0-1.25-.56-1.25-1.25V4.75zm2.5 5.5h1.75c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25h-1.75v2.5zm0 4.5h2c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25h-2v2.5z"
            />
          </svg>
        </button>

        <!-- Italic -->
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="[
            'p-1.5 rounded transition-all',
            editor.isActive('italic')
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200',
          ]"
          title="Italic"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M8.5 3h3a.5.5 0 010 1H10l-2 12h1.5a.5.5 0 010 1h-3a.5.5 0 010-1H8l2-12H8.5a.5.5 0 010-1z"
            />
          </svg>
        </button>

        <!-- Underline -->
        <button
          @click="editor.chain().focus().toggleUnderline().run()"
          :class="[
            'p-1.5 rounded transition-all',
            editor.isActive('underline')
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200',
          ]"
          title="Underline"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M5 2a1 1 0 011 1v6a4 4 0 108 0V3a1 1 0 112 0v6a6 6 0 01-12 0V3a1 1 0 011-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            />
          </svg>
        </button>

        <!-- Strikethrough -->
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :class="[
            'p-1.5 rounded transition-all',
            editor.isActive('strike')
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200',
          ]"
          title="Strikethrough"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6 5a2 2 0 012-2h4a2 2 0 012 2v1a1 1 0 11-2 0V5H8v5h2a1 1 0 110 2H8v3h4v-1a1 1 0 112 0v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-8z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Divider -->
        <div class="h-5 w-px bg-gray-300 mx-1"></div>

        <!-- Highlight -->
        <button
          @click="editor.chain().focus().toggleHighlight().run()"
          :class="[
            'p-1.5 rounded transition-all',
            editor.isActive('highlight')
              ? 'bg-yellow-100 text-yellow-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200',
          ]"
          title="Highlight"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5.005-.005c.814-.814 2.135-.814 2.949 0l.005.005.497.5a3 3 0 004.241-4.243l-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Divider -->
        <div class="h-5 w-px bg-gray-300 mx-1"></div>

        <!-- Text Alignment -->
        <button
          @click="editor.chain().focus().setTextAlign('left').run()"
          :class="[
            'p-1.5 rounded transition-all',
            editor.isActive({ textAlign: 'left' }) ||
            (!editor.isActive({ textAlign: 'center' }) &&
              !editor.isActive({ textAlign: 'right' }))
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200',
          ]"
          title="Align Left"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <button
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="[
            'p-1.5 rounded transition-all',
            editor.isActive({ textAlign: 'center' })
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200',
          ]"
          title="Align Center"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm2 4a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm-2 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm2 4a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <button
          @click="editor.chain().focus().setTextAlign('right').run()"
          :class="[
            'p-1.5 rounded transition-all',
            editor.isActive({ textAlign: 'right' })
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200',
          ]"
          title="Align Right"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M17 4a1 1 0 01-1 1H4a1 1 0 110-2h12a1 1 0 011 1zm0 4a1 1 0 01-1 1H8a1 1 0 110-2h8a1 1 0 011 1zm0 4a1 1 0 01-1 1H4a1 1 0 110-2h12a1 1 0 011 1zm0 4a1 1 0 01-1 1H8a1 1 0 110-2h8a1 1 0 011 1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Divider -->
        <div class="h-5 w-px bg-gray-300 mx-1"></div>

        <!-- Lists -->
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="[
            'p-1.5 rounded transition-all',
            editor.isActive('bulletList')
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200',
          ]"
          title="Bullet List"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M6 4a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zm0 6a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zm0 6a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zM3 4a1 1 0 100 2 1 1 0 000-2zm0 6a1 1 0 100 2 1 1 0 000-2zm0 6a1 1 0 100 2 1 1 0 000-2z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="[
            'p-1.5 rounded transition-all',
            editor.isActive('orderedList')
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200',
          ]"
          title="Numbered List"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M3 3.5A1.5 1.5 0 014.5 2h1A1.5 1.5 0 017 3.5v1A1.5 1.5 0 015.5 6h-1A1.5 1.5 0 013 4.5v-1zM4.5 3a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM9 4a1 1 0 011-1h8a1 1 0 110 2h-8a1 1 0 01-1-1zM3 9.5A1.5 1.5 0 014.5 8h1A1.5 1.5 0 017 9.5v1A1.5 1.5 0 015.5 12h-1A1.5 1.5 0 013 10.5v-1zM4.5 9a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM9 10a1 1 0 011-1h8a1 1 0 110 2h-8a1 1 0 01-1-1zM3 15.5A1.5 1.5 0 014.5 14h1a1.5 1.5 0 011.5 1.5v1A1.5 1.5 0 015.5 18h-1A1.5 1.5 0 013 16.5v-1zM4.5 15a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM9 16a1 1 0 011-1h8a1 1 0 110 2h-8a1 1 0 01-1-1z"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Editor Content -->
    <div
      ref="editorElement"
      class="tiptap-content prose prose-sm max-w-none p-4 min-h-[200px] focus:outline-none"
    ></div>
  </div>
</template>

<script>
import { Editor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";

export default {
  name: "TiptapEditor",
  props: {
    modelValue: {
      type: String,
      default: "",
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
      element: this.$refs.editorElement,
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Highlight.configure({
          multicolor: true,
        }),
        Underline,
      ],
      content: this.modelValue,
      onUpdate: () => {
        this.$emit("update:modelValue", this.editor.getHTML());
      },
    });

    // Add click outside listener for dropdown
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
    document.removeEventListener("click", this.handleClickOutside);
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
      if (this.editor.isActive("heading", { level: 1 })) return "H1";
      if (this.editor.isActive("heading", { level: 2 })) return "H2";
      if (this.editor.isActive("heading", { level: 3 })) return "H3";
      return "Normal";
    },
    handleClickOutside(event) {
      const dropdown = event.target.closest(".relative");
      if (!dropdown || !dropdown.querySelector('[data-dropdown="header"]')) {
        this.showHeaderDropdown = false;
      }
    },
  },
};
</script>

<style>
.tiptap-content {
  outline: none !important;
}

.tiptap-content p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.tiptap-content h1 {
  font-size: 2em;
  font-weight: bold;
  margin: 0.67em 0;
}

.tiptap-content h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0.75em 0;
}

.tiptap-content h3 {
  font-size: 1.17em;
  font-weight: bold;
  margin: 0.83em 0;
}

.tiptap-content ul,
.tiptap-content ol {
  padding-left: 1.2em;
  margin: 0.5em 0;
}

.tiptap-content li {
  margin: 0.25em 0;
}

.tiptap-content mark {
  background-color: #fef08a;
  padding: 0.1em 0.2em;
  border-radius: 0.2em;
}

.tiptap-content u {
  text-decoration: underline;
}

.tiptap-content s {
  text-decoration: line-through;
}

.tiptap-content [data-text-align="left"] {
  text-align: left;
}

.tiptap-content [data-text-align="center"] {
  text-align: center;
}

.tiptap-content [data-text-align="right"] {
  text-align: right;
}
</style>
