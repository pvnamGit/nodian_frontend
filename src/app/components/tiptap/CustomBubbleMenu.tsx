'use client';

import { BubbleMenu, Editor } from '@tiptap/react';
import { Box, Button, MenuItem, Paper, Select, SelectChangeEvent } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import CodeTwoToneIcon from '@mui/icons-material/CodeTwoTone';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import SubscriptIcon from '@mui/icons-material/Subscript';
import SuperscriptIcon from '@mui/icons-material/Superscript';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import './bubbleMenu.scss';
import { useState } from 'react';

function CustomBubbleMenu({ editor }: { editor: Editor | any }) {
  const [showFull, setShowFull] = useState(false);
  const [headingValue, setHeadingValue] = useState<number | null>(null);
  const handleSelectHeading = (event: SelectChangeEvent) => {
    const levelHeading = parseInt(event.target.value, 10);
    editor.chain().focus().toggleHeading({ level: levelHeading }).run();
  };
  return (
    <BubbleMenu className="bubble-menu" editor={editor} tippyOptions={{ duration: 100 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          backgroundColor: '#fefefe',
        }}
      >
        <Paper elevation={1}>
          <Select value={editor.getAttributes('heading').level} onChange={handleSelectHeading} label="Heading..." placeholder="Heading...">
            <MenuItem value={0}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Heading 1</MenuItem>
            <MenuItem value={2}>Heading 2</MenuItem>
            <MenuItem value={3}>Heading 3</MenuItem>
            <MenuItem value={4}>Heading 4</MenuItem>
          </Select>
          <Button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
            <FormatBoldIcon />
          </Button>
          <Button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
            <FormatItalicIcon />
          </Button>
          <Button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'is-active' : ''}>
            <FormatUnderlinedIcon />
          </Button>
          <Button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''}>
            <StrikethroughSIcon />
          </Button>
          <Button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>
            <FormatListBulletedIcon />
          </Button>
          <Button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''}>
            <FormatListNumberedIcon />
          </Button>
          <Button
            onClick={() => {
              editor.commands.clearNodes();
            }}
          >
            <FormatClearIcon />
          </Button>
          {!showFull ? (
            <Button onClick={() => setShowFull(true)}>
              <MoreHorizIcon />
            </Button>
          ) : (
            <Button onClick={() => setShowFull(false)}>
              <UnfoldLessIcon />
            </Button>
          )}
        </Paper>
        {showFull && (
          <Paper sx={{ marginTop: 2 }} elevation={1}>
            <Button onClick={() => editor.chain().focus().toggleTaskList().run()} className={editor.isActive('taskList') ? 'is-active' : ''}>
              <SplitscreenIcon />
            </Button>
            <Button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>
              <CodeTwoToneIcon />
            </Button>
            <Button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'is-active' : ''}>
              <FormatQuoteIcon />
            </Button>
            <Button onClick={() => editor.chain().focus().toggleSubscript().run()} className={editor.isActive('subscript') ? 'is-active' : ''}>
              <SubscriptIcon />
            </Button>
            <Button onClick={() => editor.chain().focus().toggleSuperscript().run()} className={editor.isActive('superscript') ? 'is-active' : ''}>
              <SuperscriptIcon />
            </Button>
          </Paper>
        )}
      </Box>
    </BubbleMenu>
  );
}

export default CustomBubbleMenu;
