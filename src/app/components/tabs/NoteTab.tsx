import { IconButton, Tab } from '@mui/material';
import { noop, unset } from 'lodash';
import CloseIcon from '@mui/icons-material/Close';

function NoteTab({ tabId, tabName, selectedTab, onCloseTab }: { tabId: string; tabName: string; selectedTab: string; onCloseTab: (keyTab: string) => void }) {
  return (
    <Tab
      key={tabId}
      sx={{
        marginRight: 0.25,
        color: 'white',
      }}
      label={
        <span>
          {tabName}
          <IconButton
            size="small"
            component="span"
            sx={{
              height: '20px',
            }}
            onClick={() => {
              onCloseTab(tabId);
            }}
          >
            <CloseIcon
              sx={{
                color: '#1e1e1e',
                '&:hover': {
                  color: 'white',
                },
              }}
              fontSize="small"
            />
          </IconButton>
        </span>
      }
    />
  );
}

export default NoteTab;
