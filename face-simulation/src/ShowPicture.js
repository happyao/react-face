import React from 'react';
import _ from 'lodash';
export default class ShowPicture extends React.Component{
	componentDidMount(){
		console.log('component did mount');
		if(!this.props.file){

			return;
		}
		console.log("bgw",this.props.bgwidth);
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

	    console.log('run');
	    var dataURL =""
	    reader.onload =  (event)=>{
 	  		const canvas = this.refs.canvas;
			const ctx = canvas.getContext("2d")	  
	        var image =  new Image();
        	var imgBlob  = window.URL.createObjectURL(file)
         	console.log('imgBlob',imgBlob);
         	image.onload = ()=>{
		       this.updateCanvas(ctx,image);
     		}	
         	image.src = imgBlob;
         	
	    };
	   
	    reader.readAsDataURL(file);

	    

	}
	updateCanvas(ctx,fullLoadedImage){
		 var width = fullLoadedImage.width
		 var height = fullLoadedImage.height
		 var staticNum = this.props.staticNum
		 console.log('fullLoadedImage width',width);
		 var ratio = height / width
          if(height > staticNum){
            ctx.canvas.height = staticNum
            ctx.canvas.width = staticNum / ratio 
          }else if(width > staticNum){
            ctx.canvas.width = staticNum
            ctx.canvas.height = staticNum*ratio
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

			return(
				
				<div>
				{this.props.fcButton !== 'compare' && 
					<div className="warp" style={{width: this.props.bgwidth, height: this.props.bgheight}}>
		      			<div className="image">
		       			<canvas ref="canvas"></canvas>	
		      			</div>
		   	 		</div> 

		        } 

		       	{this.props.fcButton === 'compare' && 
					<div className="warp" style={{width: 800, height: this.props.bgheight}}>
		      			<div className="image">
		       			<canvas ref="canvas1"></canvas>
		       			<canvas ref="canvas"></canvas>		
		      			</div>
		   	 		</div> 

		        } 
				</div>	
				
	
				);



	}
}