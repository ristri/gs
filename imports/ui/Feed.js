import React, { Component } from 'react';
import FeedTab from './FeedTab.js';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Studentlist } from '../api/Studentlist';
import {Feedlist} from '../api/Feedlist.js';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import Panel from 'muicss/lib/react/panel';
import moment from 'moment';
import {Stusublist} from '../api/Stusublist.js';
import Partnerlist from './Partnerlist.js';
class Feed extends Component {
     constructor(props){
         super(props);
         this.state={fl:0,fl1:false,fl2:true};
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
     studypHandler(){
         this.setState({fl1:!this.state.fl1});
     }

     renderFeed(){
         var filterList = this.props.Feedlist.filter(feedvalue => (moment().format('YYYY-MM-DD')<feedvalue.eventdate))
        return filterList.map((event,i) => (
            <FeedTab key={i} n={event.eventname} p={event.eventplace} d={event.eventdate} t={event.eventtime} l={event.participants}/>  
         ));
     }

     renderOption(){
         var list=(Stusublist.find({userid:Meteor.userId()}).fetch()[0].subjects);
         return list.map((sub,i) => (<option key={i} value={sub.subname}>{sub.subname}</option>));
     }

     listofparteners(){
          var sub = ReactDOM.findDOMNode(this.refs.selectedsub).value.trim();
          var time = ReactDOM.findDOMNode(this.refs.selecttime).value.trim();
          var list = [];
          for(var i=0;i<this.props.Studentlist.length;i++){
              if(this.props.Studentlist[i].timeav==time){
                  var flagcheck = 0;
                  var sl = [];
                  var id = this.props.Studentlist[i].userid;
                  if(id==Meteor.userId()){

                  }
                  else{
                  var sl = Stusublist.find({userid:id}).fetch()[0].subjects;
                   console.log(sl);
                  for(var j=0;j<sl.length;j++){
                      if(sl[j].subname==sub){
                          console.log(1);
                          flagcheck = 1;
                          break;
                      }
                  }
                  if(flagcheck==1){
                      list.push(this.props.Studentlist[i].name);
                  }
                }
              }
          }
         console.log(list);
          return list;
     }

     studypSubmit(){
         this.setState({fl2:!this.state.fl2});
     }
    render(){  
        if(this.state.fl==0){
          return(<Container>
              <Panel><div>
           <Button color="accent" onClick={this.clickHandler.bind(this)}>Create Study Event</Button>
            <Button color="accent" onClick={this.studypHandler.bind(this)}>Find Study Partner</Button>
            {this.state.fl1 ? <div>
              { this.state.fl2?
                <div>
                <select ref="selectedsub">
                {this.renderOption()}
                </select>
                <select ref="selecttime" >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
                <option value="Late Night">Late Night</option>
               </select>
               <Button color="accent" onClick={this.studypSubmit.bind(this)}>Go</Button>
              </div>: <div><Partnerlist l={this.listofparteners()}/><Button color="accent" onClick={this.studypSubmit.bind(this)}>Find Another Partner</Button></div>
              }
        </div> :'' }
            
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
            
            <Button color="accent" onClick={this.studypHandler.bind(this)}>Find Study Partner</Button>
            {this.state.fl1 ? <div>
              { this.state.fl2?
                <div>
                <select ref="selectedsub">
                {this.renderOption()}
                </select>
                <select ref="selecttime" >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
                <option value="Late Night">Late Night</option>
               </select>
               <Button color="accent" onClick={this.studypSubmit.bind(this)}>Go</Button>
              </div>: <div><Partnerlist l={this.listofparteners()}/><Button color="accent" onClick={this.studypSubmit.bind(this)}>Find Another Partner</Button></div>
              }
        </div> :'' }
            
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
        Feedlist: Feedlist.find({},{sort:{eventdate:1}}).fetch(),
        Stusublist: Stusublist.find({}).fetch(),
       
    };
  })(Feed);