import { Box, IconButton, Tab, Tabs } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
          <Tab
            key={tab.id}
            sx={{
              marginRight: 0.25,
              color: 'white',
            }}
            label={
              <span>
                {tab.tabName}
                <IconButton
                  size="small"
                  component="span"
                  sx={{
                    height: '20px',
                  }}
                  onClick={() => {
                    handleCloseTab(tab.id);
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
        ))}
      </Tabs>
    </Box>
  );
}

export default TabsSection;
