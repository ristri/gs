import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import { Accounts } from 'meteor/accounts-base';
import App from '../imports/ui/App.js';
// import 'font-awesome/css/font-awesome.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'mdbreact/docs/css/mdb.min.css';

import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});