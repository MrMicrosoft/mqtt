import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    Slide,
    AppBar,
    Tab,
    Tabs,
    Button
} from '@material-ui/core'
import {updateUser} from "../../Actions/LoginAction";

function Transition(props){
    return <Slide direction="up" {...props}/>
}

class AvatarPicture extends Component{
    constructor(props){
        super(props);
        this.state = {dialogOpen: false, tab: 0};
    }

    handleCloseDialog=()=>{
      this.setState({dialogOpen: false});
    };

    handleOpenDialog=()=>{
        this.setState({dialogOpen: true});
    };

    handleTabChanged=(event, value)=>{
        this.setState({tab: value});
    };

    handleProfilbildChange= (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (upload) => {
            this.setState({
                file,
                binary: upload.target.result
            });
        };
        reader.readAsDataURL(file);

        let intrr = setInterval(()=>{
            if(this.state.binary !== null){
                let user = this.props.user;
                user.profilepicture = this.state.binary;
                this.props.updateUser(user);
                clearInterval(intrr);
            }
        }, 500)
    };


    render(){
        return(
            <div>
                {this.props.user.profilepicture !== undefined&&
                    <Avatar color="inherit" onClick={()=>this.handleOpenDialog()} src={this.props.user.profilepicture}/>
                }{this.props.user.profilepicture === undefined&&
                    <Avatar color="inherit" onClick={()=>this.handleOpenDialog()}>{this.props.user.username.charAt(0)}</Avatar>
                }

                <Dialog
                    open={this.state.dialogOpen}
                    TransitionComponent={Transition}
                    onClose={this.handleCloseDialog}
                >
                    <DialogTitle>Profil Picture</DialogTitle>
                    <DialogContent>
                        <img src={this.props.user.profilepicture}/>
                        <AppBar position="static">
                            <Tabs value={this.state.tab} onChange={this.handleTabChanged}>
                                <Tab value={0} label="Upload"/>
                                <Tab value={1} label="Camera"/>
                            </Tabs>
                        </AppBar>
                        {this.state.tab === 0 &&
                        <div>
                            <input
                                accept="image/*"
                                id="button-file"
                                type="file"
                                style={{display: 'none'}}
                                onChange={this.handleProfilbildChange}
                            />
                            <label htmlFor="button-file">
                                <Button component="span" style={{alignText: 'center'}}>Upload</Button>
                            </label>
                        </div> }
                        {this.state.tab === 1 && <h1>Hello Tab 1</h1>}
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user
    }
}

export default connect(mapStateToProps, {updateUser})(AvatarPicture);