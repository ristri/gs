import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Navbar, NavbarBrand , NavItem} from 'mdbreact'
import { withTracker } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper.js';
import { Subjectlist } from '../api/Subjectlist';
import { Studentlist } from '../api/Studentlist';
import { Accounts } from 'meteor/accounts-base';
import Info from 'Info.js';

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
       
   checkrender(){
       if(this.fcheck()==1){
           return(<div>1st</div>);
       }
       else{
           return(<div>feed</div>);
       }
   }

    render(){
     console.log(Meteor.userId());
        return(
            <div>
                
    <Navbar color="blue-grey lighten-2" light>
    <AccountsUIWrapper/>
    <NavbarBrand tag="span" >
        Heading
    </NavbarBrand>
    <NavItem>
        
        </NavItem>
    </Navbar>
    <div>
        <Info flag={this.fcheck()} />
    </div>
    
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

