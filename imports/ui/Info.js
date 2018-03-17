import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Information from 'Information.js';


class App extends Component {

    render(){
        if(flag==0){
          return(<Information />);
        }
        else{
          return(<Feed />)
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