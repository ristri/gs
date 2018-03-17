import React, { Component } from 'react';
import {Feedlist} from '../api/Feedlist.js';
import { Studentlist } from '../api/Studentlist';

export default class FeedItem extends Component {
    constructor(props){
        super(props);
        this.state={fl:0};
    }
    clickHandler(){
        this.setState({fl:1});
        var name = Studentlist.find({userid:Meteor.userId()}).fetch()[0].name;
        var p =Feedlist.findOne({eventname:this.props.n});
        Feedlist.update({_id:p._id},{ $push:{participants:name}});
    }
    render(){
        if(this.state.fl==0){
            return(
                <div>
                    {this.props.n}<br/>{this.props.p}<br/>{this.props.d}<br/>{this.props.t}
                    <button onClick={this.clickHandler.bind(this)}>Join</button>

                </div>
            );
        }
        else{
           return(
               <div>
                   {this.props.n}<br/>{this.props.p}<br/>{this.props.d}<br/>{this.props.t}<br/>Joined
               </div>
           );
        }
 }
    
}