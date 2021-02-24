
import React ,{useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import './adminNav.css'
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Menu,MenuItem} from '@material-ui/core'
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'


const drawerWidth = 240;
const icon=[<ListIcon/>,<AddIcon/>]

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function AdminNavbar(props) {
    const [selectedNav, setnav] = useState('');
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavChange= (event)=>{
    setnav(event)
    if(event =='Moment List'){ 
      props.changeNav('/moment-List')
    }else{
      props.changeNav('/add-Moment')
    }
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 const onLogout =()=>{

 }

  const drawer = (
    <div>
        <div className="m-5">
        <Typography variant="h2" component="h2" gutterBottom className="mb-0">
                5D
      </Typography>
      <Typography variant="h4" gutterBottom>
      Solutions
      </Typography>
        </div>
      {/* <div className={classes.toolbar} /> */}
      <Divider />
      <List>
        {['Moment List', 'Add New Moment'].map((text, index)=>(
          <ListItem button key={text}>
            <ListItemIcon>{icon[index]}</ListItemIcon>
            <ListItemText primary={text} onClick={()=>handleNavChange(text)} />
          </ListItem>
             
        ))}
      </List>
 
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className='title'>

          <Typography variant="h6" noWrap>
           {selectedNav ? selectedNav : 'Dashboard'}
          </Typography>
          </div>
        <div>
        <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose && onLogout}>Logout</MenuItem>
              </Menu>

        </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
  
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content} >
        <div className={classes.toolbar}  />
      </main>
    </div>
  );
}

const maptoDispatchProps = dispatch =>{
  return {
      changeNav: (data) => dispatch({type:'NavChange',data})
  }
}


export default connect(null , maptoDispatchProps) (withRouter(AdminNavbar));