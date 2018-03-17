import React, { Component } from 'react';
import FeedTab from './FeedTab.js';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Studentlist } from '../api/Studentlist';
import {Feedlist} from '../api/Feedlist.js';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import Panel from 'muicss/lib/react/panel';
class Feed extends Component {
     constructor(props){
         super(props);
         this.state={fl:0};
     }
     clickHandler(){
         this.setState({fl:1});
     }

     clickHandler1(){
         this.setState({fl:0});
         var n = ReactDOM.findDOMNode(this.refs.eventname).value.trim();
         var p = ReactDOM.findDOMNode(this.refs.eventplace).value.trim();
         var d = ReactDOM.findDOMNode(this.refs.eventdate).value.trim();
         var t = ReactDOM.findDOMNode(this.refs.eventtime).value.trim();
         var name = Studentlist.find({userid:Meteor.userId()}).fetch()[0].name;
         Feedlist.insert({eventname:n,eventplace:p,eventdate:d,eventtime:t,participants:[name]});
     }
     renderFeed(){
        return this.props.Feedlist.map((event,i) => (
            <FeedTab key={i} n={event.eventname} p={event.eventplace} d={event.eventdate} t={event.eventtime} l={event.participants}/>  
         ));
     }
    render(){  
        if(this.state.fl==0){
          return(<Container>
              <Panel><div>
           <Button color="accent" onClick={this.clickHandler.bind(this)}>Create Study Event</Button>
           {this.renderFeed()}
           </div>
           </Panel>
          </Container>);
           
        }
        else{
       return(<Container>
          <div>
            <input type="text" ref="eventname" placeholder="subject name"/>
            <input type="text" ref="eventplace" placeholder="where"/>
            <input id="meeting" type="date" ref="eventdate"/>
            <input type="time" ref="eventtime" name="time"/>
            <button onClick={this.clickHandler1.bind(this)}>Create Event</button>
            {this.renderFeed()}
          </div>
          </Container>
          );
        }
    }
}
export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
        Studentlist: Studentlist.find({}).fetch(),
        Feedlist: Feedlist.find({}).fetch(),

       
    };
  })(Feed);