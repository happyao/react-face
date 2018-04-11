import React from 'react';
export default class Canvas extends React.Component{
	
	render(){

		return  <canvas ref="canvas" width="480" height="360"></canvas>;
	}
}