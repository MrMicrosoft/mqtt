import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import HomeComponent from '../HomeComponent';
import LoginComponent from '../LoginComponent';


class Router extends Component {
    render(){
        return(
        <div>
            <Switch>
                <Route exact path="/home" render={()=>(this.props.user!==undefined)?(<HomeComponent/>):(<Redirect to="/login"/>)}/>
                <Route exact path="/login" component={LoginComponent}/>
            </Switch>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user
    }
}

export default connect(mapStateToProps, null, null, {pure: false})(Router)