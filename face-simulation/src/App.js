import React, { Component } from 'react';
import './App.css';
import Files from 'react-files'
import Canvas from './Canvas';
import ReactDOM from 'react-dom'
function FuntionButton(){
  return(
    <div>
    <div className="titleBar">
      <label style={{padding: "8px"}}>Manual Face Simulation</label>
    </div>
    <div className = "function">
      <button>Face Drag</button>
      <button>Undo</button>
      <button>Redo</button>
      <button>Compare</button>
      <button>Reset</button>
      <button>Download</button>
    </div>
    </div>
    )
}


function ScrollButton(){
  return(
    <div>
      <span>Name</span>
      <input type="range" min="1" max="5" value="3" step="0.1"/>
      <input type="text" value="3"/>

    </div>
    )

}
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      mode: 'manual',
      lang: 'en',
      filename: 'No File Chosen',
      cHeight : 0,
      cWidth : 0,
      dataURL : '',
      start: 'off',

    };
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
    var reader = new FileReader()
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    var dataURL =""
    reader.onload =  function(event){
        var data = event.target.result
        var image =  new Image()
        image.onload = function(){
          var width = image.width
          var height = image.height
          var ratio = height / width
          if(height > 400){
            ctx.canvas.height = 400
            ctx.canvas.width = 400 / ratio 
          }else if(width > 400){
            ctx.canvas.width = 400
            ctx.canvas.height = 400*ratio
          }else{
            ctx.canvas.width = width
            ctx.canvas.height = height
          }
          var src  = window.URL.createObjectURL(file)
          console.log("src",src)
          var base_image = new Image()
          base_image.src = src
          base_image.onload = function(){
          ctx.drawImage(base_image,0,0,ctx.canvas.width,ctx.canvas.height)
          dataURL = canvas.toDataURL()
          console.log("dataURL",dataURL)
          this.setState(function(){
          return{
            filename: file.name,
            cHeight : ctx.canvas.height,
            cWidth: ctx.canvas.width,
            dataURL: dataURL,
          }
          });
          }.bind(this);
        }.bind(this);
        image.src = data
    }.bind(this);
    reader.readAsDataURL(file)
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


  render() {
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
           <FuntionButton className="manualButton"/>
           <div className="manualScroll">
              <ScrollButton/>
              <ScrollButton/>
              <ScrollButton/>
          </div>
        </div>
        }

        {this.state.mode === "manual" &&
        <div className="warp">
          <div className="image">
           <Canvas dataURL={this.state.dataURL} />
          </div>
        </div>          
        }

      </div>


    );
  }
}

export default App;
