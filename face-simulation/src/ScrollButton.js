import React from 'react';
import _ from 'lodash';
export default class ShowPicture extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      value:'3'
    }
    this.changeValue = this.changeValue.bind(this);
    this.defaultValue = this.defaultValue.bind(this);
  }


  changeValue(event){
    this.setState({value:event.target.value})
  }

  defaultValue(){
    this.setState({value:3})
  }
  render(){
      return(
      <div>
        <span>{this.props.name}</span>
        <input type="range" min="0" max="5" value ={this.state.value} step="0.1" onChange={this.changeValue}/>
        <input type="text" value={this.state.value}/>
        <button onClick={this.defaultValue}>default</button>
      </div>
    )
  }	
}
