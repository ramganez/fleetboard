import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BarChartIcon from '@mui/icons-material/BarChart';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Person2SharpIcon from '@mui/icons-material/Person2Sharp';


const drawerWidth = 240;

export default function DrawerComponent(props) {

  const handleListItemClick = (event, index) => {
    props.setSelectedMenu(index);
    props.showBackdrop(true);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {['Transaction', 'Product', 'Profile'].map((text, index) => (
            <ListItem key={text}
              selected={index === props.selectedMenu}
              disablePadding>
              <ListItemButton
                onClick={(event) => handleListItemClick(event, index)}>
                <ListItemIcon>
                  {index === 0 && <BarChartIcon />}
                  {index === 1 && <PlaylistAddIcon />}
                  {index === 2 && <Person2SharpIcon />}
                </ListItemIcon>
                <ListItemText divider={true} primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}