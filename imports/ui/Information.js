import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Subjectlist } from '../api/Subjectlist';
import { Studentlist } from '../api/Studentlist';
import Infolist from './Infolist.js';
import { Stusublist } from '../api/Stusublist';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Panel from 'muicss/lib/react/panel';

class Information extends Component {
     constructor(props){
         super(props);
         this.state={fl:false};
     }
    
    renderTasks() {
        return this.props.Subjectlist.map((name,i) => (
            <Col md="4"> <Infolist key={i} subname={name.name} />  </Col>
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
        
        return(
            <Container> 
                <Row>
            <div>
                <Panel>
                <Col md="12">
           Welcome <br/><br/><br/>
           </Col>
           <Col md="12">
           <div className="group">  
           <input className="text" type="text" placeholder="Full Name" ref="name" />    
      <span className="highlight"></span>
      <span className="bar"></span>
      <label>Name</label>
    </div>
          
          </Col>
          </Panel>
          
          {this.renderTasks()}

            
                <Col md="12">
                <Panel>
          <select ref="avltime" >
        <option value="Morning">Morning</option>
        <option value="Afternoon">Afternoon</option>
        <option value="Evening">Evening</option>
        <option value="Night">Night</option>
        <option value="Late Night">Late Night</option>
        </select>
        </Panel>
        </Col>
        <Col md="12">
        <Panel>
          <Button color="accent" onClick={this.submitHandler.bind(this)}>
             Submit
          </Button>
          </Panel>
          </Col>
         
          </div>
          </Row>
          </Container>
         );}
    
}


export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
        Subjectlist: Subjectlist.find({}).fetch(),
        Studentlist: Studentlist.find({}).fetch(),
        Stusublist: Stusublist.find({}).fetch(),
    };
  })(Information);