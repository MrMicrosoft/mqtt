import React, {Component} from 'react';
import {
    List,
    ListItem
} from '@material-ui/core';
import {subscribe} from 'mqtt-react';

class MQTT extends Component{
    componentWillReceiveProps(nextProps){
            console.log("props updated");
            console.log(nextProps);
    }

    render(){
        return(
        <div>
            <h1>MQTT</h1>
            <List>
                {
                    this.props.data.map((message,i)=><ListItem key={i}>{new Date().toLocaleString()} : <b>{message.name} - {message.body}</b></ListItem>)
                }
            </List>
        </div>)
    }
}

export default subscribe({
    topic: 'test_channel'
})(MQTT)

