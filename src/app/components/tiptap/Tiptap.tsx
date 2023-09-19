'use client';

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
import CustomBubbleMenu from './CustomBubbleMenu';

function Tiptap({ contentProps, onChange, onDestroy }: { contentProps: string; onChange: (content: string) => void; onDestroy: () => void }) {
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
      Placeholder,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Text,
      Typography,
    ],

    content: contentProps,
    editable: true,
    autofocus: true,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    onDestroy: () => {
      onDestroy();
    },
  });

  if (!tiptapEditor) return null;

  return (
    <>
      {tiptapEditor && <CustomBubbleMenu editor={tiptapEditor} />}
      <EditorContent editor={tiptapEditor} />
    </>
  );
}

export default Tiptap;
