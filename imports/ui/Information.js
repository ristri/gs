import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Input } from 'mdbreact';
import { Subjectlist } from '../api/Subjectlist';
import { Studentlist } from '../api/Studentlist';
class Information extends Component {

    render(){
        return(
            <div>
gjdfghv
<Input label="Example label" />
                </div>

        )
    }
}


export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
        Subjectlist: Subjectlist.find({}).fetch(),
        Studentlist: Studentlist.find({}).fetch(),
    };
  })(Information);