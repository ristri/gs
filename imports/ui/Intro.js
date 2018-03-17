import React, {Component} from "react";
import { render } from "react-dom";

const styles = {
fontFamily: "sans-serif",
textAlign: "center"
};

const backgroundimg = {
/* Set up positioning */
position: "fixed",
top: "0",
left: "0",
zIndex: "-1"
};

// Full page background color
const maindiv = {
/* Set rules to fill background */
minHeight: "100%",
minWidth: "1024px",

/* Set up proportionate scaling */
width: "100%",
height: "auto",

/* Set up positioning */
position: "fixed",
top: "0",
left: "0",
zIndex: "-1"
};
const jumbo = {
background: "red"
};


export default class Intro extends Component {
    render(){

    return(
<div style={styles}>
<div style={maindiv}>
<img
style={backgroundimg}
src="http://slc.berkeley.edu/sites/default/files/pictures/frontbackground/thecenter_0.png"
alt="bg"
className="bg"
/>
</div>
</div>
);
    }
}


