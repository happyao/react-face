import React, { Component } from 'react';
import './App.css';
import Files from 'react-files'
import ShowPicture from './ShowPicture';
import ScrollButton from './ScrollButton';

import ReactDOM from 'react-dom'


function AutoAll(props){
  return(
    <div className="AutoMode">
      <ShowPicture file={props.file} bgwidth={300} bgheight={300} staticNum={250}  />
      <ShowPicture file={null} bgwidth={300} bgheight={300} staticNum={250}  />
      <ShowPicture file={null} bgwidth={300} bgheight={300} staticNum={250}  />
    </div>
    )
}

class FuntionButton extends Component{
  constructor(props){
    super(props);
    this.state={
      onfl: false,
      onflName:'Face Drag'
    }
    this.handleFunctionButtonChange =this.handleFunctionButtonChange.bind(this);
    this.handleOtherFunctionButtonChange = this.handleOtherFunctionButtonChange.bind(this);
  }
  handleFunctionButtonChange(e){
    this.setState({
      onfl: !this.state.onfl,
      onflName: e.target.innerHTML
    })
    this.props.onFuntionButtonChange(e.target.value)
  }
  handleOtherFunctionButtonChange(e){
    this.props.onFuntionButtonChange(e.target.value)
  }
  render(){
   return(
    <div>
    <div className="titleBar">
      <label style={{padding: "8px"}}>Manual Face Simulation</label>
    </div>
    <div className = "function">
      <button onClick={this.handleFunctionButtonChange}>{this.state.onflName}</button>
      <button value = "undo" onClick={this.handleOtherFunctionButtonChange}>Undo</button>
      <button value = "redo" onClick={this.handleOtherFunctionButtonChange}>Redo</button>
      <button value = "compare" onClick={this.handleOtherFunctionButtonChange}>Compare</button>
      <button value = "reset" onClick={this.handleOtherFunctionButtonChange}>Reset</button>
      <button value = "download" onClick={this.handleOtherFunctionButtonChange}>Download</button>
    </div>
    {this.state.onfl &&
       <div className="fcList">
       <button value="facedrag" onClick={this.handleFunctionButtonChange}>Face Drag</button><br/>
       <button value="grow" onClick={this.handleFunctionButtonChange}>Grow</button><br/>
       <button value="shrink" onClick={this.handleFunctionButtonChange}>Shrink</button><br/>
       <button value="whiten" onClick={this.handleFunctionButtonChange}>Whiten</button><br/>
       <button value="darken" onClick={this.handleFunctionButtonChange}>Darken</button>
       </div>
    }
    </div>
  
    )   
  }

}


/*class ScrollButton extends Component{

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


}*/

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      mode: 'manual',
      lang: 'en',
      filename: 'No File Chosen',
      file : null,
      start: 'off',
      fcButton:'facedrag',
    };
    this.handleLang = this.handleLang.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.onModeChange =  this.onModeChange.bind(this)
    this.startAction  = this.startAction.bind(this)
    this.handleFunctionButtonChange = this.handleFunctionButtonChange.bind(this)
  }

  handleLang(event){
    var value = event.target.value
    this.setState(function(){
      return{
        lang : value

      }
    });
  }

  onFileChange(files){
    console.log('file',files[0])
    var file = files[0]
    var reader = new FileReader();
    var src  = window.URL.createObjectURL(file)
    console.log('src',src);
    var dataURL =""
    this.setState({file:file, filename: file.name});
  }

  onFileError(error,file){
    console.log('error code '+ error.code +': '+ error.message)
  }
  onModeChange(event){
    var mode = event.target.value;
    this.setState({mode:mode});
  }

  startAction(){
    this.setState({start:'on'});
  }

  handleFunctionButtonChange(fcButton){
    this.setState({fcButton:fcButton});
  }


  render() {
    var file = this.state.file;
     let scrollBtns = ['Radius:','Ratio:','Angle:'].map(name=><ScrollButton key={name} name={name} />);


    return (
      <div className="App">
        <div className="Title">
          <div className="Lang">
            <button onClick={this.handleLang} value="en">English</button>
            <button onClick={this.handleLang} value="cn">Chinese</button>
          </div>
          <div className="files">
            <Files 
              className='files-dropzone'
              onChange={this.onFileChange}
              onError={this.onFileError}
              accepts={['image/*']}
              multiple = {false}
              clickable >
              Choose File
            </Files>
            <label>
              {this.state.filename}
            </label>
          </div>
          <div>
            <label>Choose Mode:</label>
            <select className="selector" onChange={this.onModeChange}>
              <option value="manual">Manual</option>
              <option value="auto">Auto</option> 
            </select>
          </div>
          <button onClick = {this.startAction}>Start</button>
        </div>

        {this.state.mode === "manual" && this.state.start === 'on' &&
        <div className ="manualAll">
           <div className="placeholder">
           </div>
           <div className="manualButton">
            <FuntionButton
              onFuntionButtonChange={this.handleFunctionButtonChange}
            />
           </div>

           <div className="manualScroll">{scrollBtns}
          </div>
        </div>        
        }

        {this.state.mode === "manual" &&
        <ShowPicture fcButton = {this.state.fcButton} file={this.state.file} bgwidth={500} bgheight={500} staticNum={400} />
        }

        {this.state.mode === "auto" &&
        <AutoAll
        file = {file}/>
        }
      </div>


    );
  }
}

export default App;
