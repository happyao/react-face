import React from 'react';
import _ from 'lodash';
export default class TitleBar extends React.Component(){
	constructor(props){
	
	this.handleLang = this.handleLang.bind(this)
	this.onFileChange = this.onFileChange.bind(this)
    this.onModeChange =  this.onModeChange.bind(this)
    this.startAction  = this.startAction.bind(this)
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
    this.setState(function(){
      return{
        mode: mode
      }
    })
  }

  startAction(){
    this.setState(function(){
      return{
         start : 'on'
      }
    })
  }

	render(){
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
	}
}