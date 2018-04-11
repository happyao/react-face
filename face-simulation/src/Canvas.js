import React from 'react';
import _ from 'lodash';
export default class Canvas extends React.Component{
	componentDidMount(){
		console.log('component did mount');
		if(!this.props.file){
			return;
		}
		this.readFileAndUpdateToCanvas(this.props.file);
	}
	componentWillReceiveProps(newProps){
		console.log('component will receive props');
		if(!newProps.file){
			return false;
		}
		this.readFileAndUpdateToCanvas(newProps.file);
	}

	readFileAndUpdateToCanvas(file){
		var reader = new FileReader()
	    const canvas = this.refs.canvas;
	    const ctx = canvas.getContext("2d")
	    console.log('run');
	    var dataURL =""
	    reader.onload =  (event)=>{
	        var image =  new Image();
        	var imgBlob  = window.URL.createObjectURL(file)
         	console.log('imgBlob',imgBlob);
         	image.onload = ()=>{
		       this.updateCanvas(image);
     		 }
         	 image.src = imgBlob;
	
	    };
	    reader.readAsDataURL(file);

	}
	updateCanvas(fullLoadedImage){
		 var width = fullLoadedImage.width
		 var height = fullLoadedImage.height
		 console.log('fullLoadedImage width',width);
		 const canvas = this.refs.canvas
    	const ctx = canvas.getContext("2d")
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
          ctx.drawImage(fullLoadedImage,0,0,ctx.canvas.width,ctx.canvas.height);
	}
	render(){
			let warningMsg;
			if(!this.props.file){
				warningMsg = <div>please select file</div>
			}

			return <div>
				{warningMsg}
				<canvas ref="canvas" width="480" height="360"></canvas>		
			
			</div>;			


	}
}