import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {
    Drawer,
    AppBar,
    Toolbar,
    MenuItem,
    Typography,
    Divider,
    IconButton,
    MenuList
} from '@material-ui/core'
import Router from '../Router';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AvatarPicture from '../HomeComponent/AvatarPicture';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        height: '100%'
    },
    appFrame: {
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'appBarShift-left': {
        marginLeft: drawerWidth,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,

    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    }
});

class Header extends React.Component {
    state = {
        open: false
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { open } = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: open,
                            [classes[`appBarShift-left`]]: open,
                        })}>
                        <Toolbar disableGutters={!open}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, open && classes.hide)}>
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="title" color="inherit" noWrap style={{flex: 1}}>
                                AppBar
                            </Typography>
                            {this.props.user!==undefined&&<AvatarPicture/>}
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="persistent"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={this.handleDrawerClose}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <MenuList>
                            {this.props.user === undefined&&<MenuItem onClick={()=>{this.props.history.push('/login'); this.handleDrawerClose();}}>Login</MenuItem>}
                            <MenuItem onClick={()=>{this.props.history.push('/linechart'); this.handleDrawerClose()}}>LineChart</MenuItem>
                            <MenuItem>Menu 3</MenuItem>
                        </MenuList>
                    </Drawer>
                    <main
                        className={classNames(classes.content, classes[`content-left`], {
                            [classes.contentShift]: open,
                            [classes[`contentShift-left`]]: open,
                        })}
                    >
                        <div className={classes.drawerHeader} />
                        <Router/>
                    </main>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.login.user
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps)(Header)));