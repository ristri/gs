import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Subjectlist } from '../api/Subjectlist';
import { Studentlist } from '../api/Studentlist';
import Infolist from './Infolist.js';
import { Stusublist } from '../api/Stusublist';
class Information extends Component {
     constructor(props){
         super(props);
         this.state={fl:false};
     }
    
    renderTasks() {
        return this.props.Subjectlist.map((name,i) => (
           <Infolist key={i} subname={name.name} />  
        ));
    }

    submitHandler(){
        var t=ReactDOM.findDOMNode(this.refs.avltime).value.trim();
        var n=ReactDOM.findDOMNode(this.refs.name).value.trim();
        var id=Meteor.userId();
        Studentlist.insert({userid:id,name:n,timeav:t});
        
        this.setState({fl:!this.state.fl});
    }
    
    render(){
       
        if(this.state.fl==false)
        {
        return(
            <div>
           Welcome 
          <input type="text" ref="name" />
          
          {this.renderTasks()}

          <select ref="avltime" >
        <option value="Morning">Morning</option>
        <option value="Afternoon">Afternoon</option>
        <option value="Evening">Evening</option>
        <option value="Night">Night</option>
        <option value="Late Night">Late Night</option>
        </select>

          <button onClick={this.submitHandler.bind(this)}>
             Submit
          </button>
          </div>
         );}
         else{
             return(<div>feed</div>);
         }
    }
}


export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
        Subjectlist: Subjectlist.find({}).fetch(),
        Studentlist: Studentlist.find({}).fetch(),
        Stusublist: Stusublist.find({}).fetch(),
    };
  })(Information);