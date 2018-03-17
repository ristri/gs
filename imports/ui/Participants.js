import React from 'react';
import ReactDOM from 'react-dom';

export default class Example extends React.Component {
    renderP(){
        
        return(this.props.l.map((item,i)=> <li key={i}>{item}</li>));
    }
    render(){
        return(<ul>
            {this.renderP()}
        </ul>);
    }

}
