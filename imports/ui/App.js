import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';


import { withTracker } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper.js';
import { Subjectlist } from '../api/Subjectlist';
import { Studentlist } from '../api/Studentlist';
import { Accounts } from 'meteor/accounts-base';
import Info from './Info.js';
import Intro from './Intro.js';
import Appbar from "muicss/lib/react/appbar";

let s1 = { verticalAlign: "middle", textAlign: "left" };
let s2 = { textAlign: "left" };
const navstyles = {
    background:
    "linear-gradient(to right, #642b73, #c6426e)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    };
    let imgstyle = { display : "block" , marginLeft : "auto" , marginRight : "10px" ,maxHeight : "70%" , maxWidth: "80%"};

class App extends Component {
    fcheck(){
        var flag=1;
        for( var i =0 ;i<this.props.Studentlist.length;i++){
            if(Meteor.userId()==this.props.Studentlist[i].userid)
            {  flag=0;
               break;
            }
        }
        return flag;
      }

    render(){
     console.log(Meteor.userId());
        return(
            <div>
                
                <Appbar style={navstyles}>
<table width="100%">
<tbody>
<tr style={s1}>
<td className="mui--appbar-height"><AccountsUIWrapper/></td>
<td className="mui--appbar-height" style={s2}>
<img style={imgstyle} src="https://s18.postimg.org/awntbtx49/logo.png"/>
</td>
</tr>
</tbody>
</table>
</Appbar>
    
    {Meteor.userId() ? 
    <div>
        <Info flag={this.fcheck()} />
    </div> : <Intro />}
    
    </div>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
        Subjectlist: Subjectlist.find({}).fetch(),
        Studentlist: Studentlist.find({}).fetch(),
    };
  })(App);

