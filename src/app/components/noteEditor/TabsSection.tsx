import { Box, Tabs } from '@mui/material';
import NoteTab from '../tabs/NoteTab';

const mockTabsData = [
  { id: '1', tabName: 'Tab 1' },
  { id: '2', tabName: 'Tab 2' },
  { id: '3', tabName: 'Tab 3' },
];

function TabsSection() {
  const handleCloseTab = (keyTab: string) => {
    console.log('Closed: ', keyTab);
  };
  return (
    <Box
      sx={{
        borderBottom: '0.5px solid white',
      }}
    >
      <Tabs>
        {mockTabsData.map(tab => (
          <NoteTab key={tab.id} tabId={tab.id} tabName={tab.tabName} onCloseTab={handleCloseTab} />
        ))}
      </Tabs>
    </Box>
  );
}

export default TabsSection;
