import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Toolbar, Typography} from '@material-ui/core'
import FriendRequestComponent from './FriendRequest';

class HomeComponent extends Component{
    render(){
        return(
            <Toolbar>
                <Typography variant="title">{this.props.user.username}</Typography>
                <FriendRequestComponent/>
            </Toolbar>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.login.user
    }
}

export default connect(mapStateToProps)(HomeComponent);