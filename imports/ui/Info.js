import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Information from './Information.js';
import { Subjectlist } from '../api/Subjectlist';
import { Studentlist } from '../api/Studentlist';

class Info extends Component {

    render(){
        if(this.props.flag==0){
          return(<div>Hi</div>);
        }
        else{
          return(<Information />)
        }
    }
}
export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
        Subjectlist: Subjectlist.find({}).fetch(),
        Studentlist: Studentlist.find({}).fetch(),
    };
  })(Info);