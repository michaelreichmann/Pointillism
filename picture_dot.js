//input picture
var picture = new JitterMatrix("picture");

//jit.gl.sketch to display the dots
var sketch = new JitterObject("jit.gl.sketch", "wrld");
sketch.color = [1 ,1,1, 1];


inlets = 4;

//scale of the picture
var scale = 4;
declareattribute("scale");
//scale of the points
var pointScale = 0.025;
declareattribute("pointScale");
//threshold; smaller points won't be drawn
var dotThresh = 0.01;
declareattribute("dotThresh");

//set dot position and radius
function circleDraw(posX, posY, rad)
{
	sketch.moveto(posX, posY, 0);
	sketch.circle(rad);
}

//set dot position and radius
function drawPoints() 
{
	//get the dimension of the picture
	var dim = picture.dim[0];
	
	//get every pixel
  	for(var i = 0; i < dim; i++) 
	{
      	for (var j = 0; j < dim; j++) 
		{
			//the dot radius depends on the brightness of the pixel
			var rad = picture.getcell(i, j)[1] * pointScale;
			
				//x and y coordinates of the points, centered around 0,0
				var pointX = i/dim * scale - scale * 0.5;
				var pointY = (dim-j)/dim * scale - scale * 0.5;
			
			//only draw a dot, if it is bigger then the threshold
			if(rad > dotThresh)
			{
				circleDraw(pointX, pointY, rad);
			}
		}
	}
};


//draw the picture
function drawFrames()
{
	sketch.reset();
	sketch.draw();
	drawPoints();

}