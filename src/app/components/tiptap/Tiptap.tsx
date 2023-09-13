import { BubbleMenu, Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './Tiptap.scss';
import { MenuButtonBold, MenuButtonItalic, MenuControlsContainer, MenuDivider, MenuSelectHeading, RichTextEditorProvider, RichTextField } from 'mui-tiptap';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import Image from '@tiptap/extension-image';
import OrderedList from '@tiptap/extension-ordered-list';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline';
import Dropcursor from '@tiptap/extension-dropcursor';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Text from '@tiptap/extension-text';
import Typography from '@tiptap/extension-typography';

function Tiptap() {
  const tiptapEditor = useEditor({
    extensions: [
      StarterKit,
      BulletList.configure({
        keepMarks: true,
        itemTypeName: 'listItem',
        HTMLAttributes: {
          class: 'bullet-list',
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: 'list-item',
        },
      }),
      Image.configure({
        allowBase64: true,
      }),
      OrderedList.configure({
        itemTypeName: 'listItem',
        keepMarks: true,
      }),
      TaskList.configure({
        itemTypeName: 'taskItem',
      }),
      TaskItem.configure({
        nested: true,
      }),
      Subscript,
      Superscript,
      Underline,
      Dropcursor,
      Placeholder.configure({
        includeChildren: true,
        emptyEditorClass: 'is-editor-empty',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Text,
      Typography,
    ],

    content: `
    <h2>
      Hi there,
    </h2>
    <p>
      this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li>
        That’s a bullet list with one …
      </li>
      <li>
        … or two list items.
      </li>
    </ul>
    <p>
      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    </p>
    <pre><code class="language-css">body {
display: none;
}</code></pre>
    <p>
      I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    </p>
    <blockquote>
      Wow, that’s amazing. Good work, boy! 👏
      <br />
      — Mom
    </blockquote>
    <p>
    I like lists. Let’s add one:
  </p>
  <ul>
    <li>This is a bullet list.</li>
    <li>And it has three list items.</li>
    <li>Here is the third one.</li>
  </ul>
  <p>
    Do you want to see one more? I bet! Here is another one:
  </p>
  <ol>
    <li>That’s a different list, actually it’s an ordered list.</li>
    <li>It also has three list items.</li>
    <li>And all of them are numbered.</li>
  </ol>
  <p>
    Lists would be nothing without list items.
  </p>
  `,
    editable: true,
    autofocus: true,
  });

  if (!tiptapEditor) return null;

  return <EditorContent editor={tiptapEditor} />;
}

export default Tiptap;
