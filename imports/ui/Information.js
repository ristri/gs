import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';




export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
        Subjectlist: Subjectlist.find({}).fetch(),
        Studentlist: Studentlist.find({}).fetch(),
    };
  })(Information);