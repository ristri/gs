import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Studentlist } from '../api/Studentlist';
import {Feedlist} from '../api/Feedlist.js';
import {Stusublist} from '../api/Stusublist.js';
import {Subjectlist} from '../api/Subjectlist.js';
class Profile extends Component {
    render(){
        return(<div>Profile</div>);
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
        Subjectlist: Subjectlist.find({}).fetch(),
        Studentlist: Studentlist.find({}).fetch(),
        Stusublist: Stusublist.find({}).fetch(),
    };
  })(Profile);