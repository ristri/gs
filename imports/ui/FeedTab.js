import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';
import FeedItem from './FeedItem.js';
import Participants from './Participants.js';
import Panel from 'muicss/lib/react/panel';
import { Studentlist } from '../api/Studentlist';

export default class Example extends React.Component {
  onChange(i, value, tab, ev) {
    console.log(arguments);
  }

  onActive(tab) {
    console.log(arguments);
  }

  jcheck(){
    var temp = false;
    var name = Studentlist.find({userid:Meteor.userId()}).fetch()[0].name;
    console.log(name);
    console.log(this.props.l);
    for(var i=0;i<this.props.l.length;i++){
      if(name==this.props.l[i]){
        temp = true;break;
      }
       
    }
    return temp;

  }

  render() {
    return (
        <Panel>
      <Tabs onChange={this.onChange} defaultSelectedIndex={0}>
        <Tab value="pane-1" label="Event Details" onActive={this.onActive}><FeedItem check={this.jcheck()}  n={this.props.n} p={this.props.p} d={this.props.d} t={this.props.t}/></Tab>
        <Tab value="pane-2" label="Participants"><Participants l={this.props.l}/></Tab>
      </Tabs>
      </Panel>
    );
  }
}
