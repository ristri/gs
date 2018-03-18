import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Subjectlist } from '../api/Subjectlist';
import { Studentlist } from '../api/Studentlist';
import { Stusublist } from '../api/Stusublist';
import Panel from 'muicss/lib/react/panel';



class Infolist extends Component {

    constructor(props){
        super(props);
        this.state={check:false};
    }
    toggleChecked() {
       this.setState({check:!this.state.check});
       if(!this.state.check){
       }
       
       else{   console.log("delete");
        var sub = this.props.subname;
        var temp1 = Stusublist.find({userid:Meteor.userId()}).fetch();
        var temp = temp1[0].subjects;
        console.log(temp);
        for(var i=0;i<temp.length;i++){
            if(sub==temp[i].subname){
                var k =i;
                break;
            }
        }
        temp.splice(i,1);
        var p = Stusublist.findOne({userid:Meteor.userId()});
        Stusublist.update({_id:p._id},{userid:Meteor.userId(),subjects:temp});
        }
    }
       
      changeHandler(){
        var sub = this.props.subname;
        var prof = ReactDOM.findDOMNode(this.refs.prof).value.trim();
        const itemobj = {subname:sub,prof:prof};
        console.log(itemobj);
      
        //this.props.subjects = this.props.subjects.push(itemobj);
        var k=0;
        for(var i= 0;i<this.props.Stusublist.length;i++){
           if(Meteor.userId()==this.props.Stusublist[i].userid)
           {k=1;
           break; }
            }
        if(k==1){  
            var p = Stusublist.findOne({userid:Meteor.userId()});
          Stusublist.update({_id:p._id},{ $push:{subjects:itemobj}});
        }
         else{   console.log("insert");
         const itemlist = [itemobj] ;
        Stusublist.insert({userid:Meteor.userId(),subjects:itemlist});
        }
      }

    
   render() {
       return(
           <Panel>
             <div>
             <input
             type="checkbox"
             
            onClick={this.toggleChecked.bind(this)}
              />
             {this.props.subname}
             <div>
            
             </div>
             { this.state.check?<input className="text" type="number" ref="prof" onChange={this.changeHandler.bind(this)}/>:''
             }
            </div>
            </Panel>   
       );
   }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
        Subjectlist: Subjectlist.find({}).fetch(),
        Studentlist: Studentlist.find({}).fetch(),
        Stusublist: Stusublist.find({}).fetch()
    };
  })(Infolist);
