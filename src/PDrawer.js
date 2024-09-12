import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'drawerOpen' })(
  ({ theme, drawerOpen }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerOpen ? drawerWidth : 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  })
); //the main layout moves according to the drawer movement

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1, 
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(prevOpen => !prevOpen); // toggle drawer state
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // toolbar spaces the content and typograpgy is avoided to shift to centre
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>  
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle} 
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>            
            REFACTUM Fertigungsassistant
          </Typography>
          <IconButton
                size="large"
                color="inherit"
              >
                <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="temporary" 
        anchor="left"
        open={open}
        onClose={handleDrawerClose} 
        BackdropProps={{ invisible: true }} // the mainlayout color is same as nefore and not the default backdrop
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Auftrag erstellen'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Divider />
        <List>
          {['Lezte Auftrage', '674878', '568567'].map((text, index) => ( // changed icons
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{index === 0 && <AccessTimeIcon />}</ListItemIcon> 
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Auftrage Suchen'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer> 
      <Main drawerOpen={open}> 
      <DrawerHeader />
        <Stack spacing={2} direction="column"> 
          <Stack spacing={2} direction="row">
            <Button variant="contained" sx={{ flexShrink: 0 }}>Diameter Match</Button>
            <Button variant="contained" sx={{ flexShrink: 0 }}>Roughness Match</Button>
          </Stack>
        <Button variant="contained" sx={{ width: 'auto', flexShrink: 0, alignSelf: 'flex-start' }}>Reset Neo4j DB</Button>  
        </Stack>
      </Main>
    </Box>
  ); // the buttons are arranged 2 sharing the same row and and one below them
}

PDrawer.propTypes = {
  open: PropTypes.bool,
};
