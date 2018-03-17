import React, { Component } from 'react';
import FeedItem from './FeedItem.js';
import { withTracker } from 'meteor/react-meteor-data';
class Feed extends Component {

    render(){
       return(<div>
           <button>Create Event</button>
           <FeedItem/>
       </div>);
    }
}
export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
       
    };
  })(Feed);