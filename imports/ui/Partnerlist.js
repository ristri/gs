import React, { Component } from 'react';

export default class Intro extends Component {
   renderL(){
       return this.props.l.map((p,i)=> (<li key={i}>{p[0]}  {p[1]}</li>));
   }
   
    render(){
       if(this.props.l.length==0){
       return(<div>Sorry no partner at your time with this subject</div>);
       }
       else{
        return(<ul>{this.renderL()}</ul>);
       }
   }
}
