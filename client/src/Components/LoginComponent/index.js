import React, {Component} from 'react';
import {
    Typography,
    FormControl,
    Input,
    InputLabel,
    Button,
    FormHelperText
} from '@material-ui/core';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {login, register} from '../../Actions/LoginAction';

class LoginComponent extends Component {
    constructor(props){
        super(props);
        this.state = {username: "", password:""};
    }

    handleChange = (name, value)=>{
        this.setState({[name]: value});
    };

    handleLogin = ()=>{
        this.props.login(this.state.username, this.state.password);
        this.redirectAfterLogin();
    };

    handleRegister = ()=>{
        this.props.register(this.state.username, this.state.password);
        this.redirectAfterLogin();
    };

    redirectAfterLogin(){
        let int = setInterval(()=>{
            if(this.props.loginProp.user !== undefined){
                clearInterval(int);
                this.props.history.push('/home');
            }
        }, 100)
    };

    render(){
        const styles = {
            wrapper:{
                textAlign: "center"
            }, formWrapper:{
                textAlign:"center"
            }, buttonWrapper:{
                marginTop: "10px"
            }
        };

        document.title = "Login | Chat";
        return(
            <div style={styles.wrapper}>
                <Typography variant="display3" color="inherit" align="center">Login</Typography>
                <div style={styles.formWrapper}>
                    <FormControl error={this.props.loginProp.err !== undefined}>
                        <InputLabel>Username</InputLabel>
                        <Input
                            id="username"
                            onChange={(event)=>this.handleChange(event.target.id, event.target.value)}
                            value={this.state.username}
                        />
                    </FormControl><br/>
                    <FormControl error={this.props.loginProp.err !== undefined}>
                        <InputLabel>Password</InputLabel>
                        <Input
                            id="password"
                            type="password"
                            onChange={(event)=>this.handleChange(event.target.id, event.target.value)}
                            value={this.state.password}
                        />
                        {this.props.loginProp.err !== undefined&&<FormHelperText>{this.props.loginProp.err}</FormHelperText>}
                    </FormControl><br/>
                    <div style={styles.buttonWrapper}>
                        <Button onClick={()=>this.handleLogin()} variant="outlined" color="primary">Login</Button>
                        <Button onClick={()=>this.handleRegister()} color="secondary">Register</Button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        loginProp: state.login
    }
}

export default connect(mapStateToProps,{login, register})(withRouter(LoginComponent));