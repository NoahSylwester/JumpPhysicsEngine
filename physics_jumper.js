// Get the width and height of the window
var win = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = win.innerWidth || e.clientWidth || g.clientWidth,
    height = win.innerHeight|| e.clientHeight|| g.clientHeight;
    
// Initialise an array to hold the physical objects
var physicalObjects = [];
 
// Initialise the canvas element and set it's width and height
var canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = width - 20;
    canvas.height = height + 20;
 
// Append the canvas element to the HTML body
document.body.appendChild(canvas);
 
// Get the canvas's context object
var context = canvas.getContext("2d");

var PhysicalObject = function(x, y, w, h) 
{
    // Set the object's x/y position
    this.x = x;
    this.y = y;
    
    // Set the object's width and height
    this.width = w;
    this.height = h;
    
    // Initialise the object's x and y velocity with a value of 0 (it's stationary initially)
    this.xVel = 0;
    this.yVel = 0;
    
    // Adjust the object's x velocity
    this.addXVel = function(vel) { 
        this.xVel += vel;
    };
    
    // Adjust the object's y velocity
    this.addYVel = function(vel) { 
        this.yVel += vel;
    };
    
    // Update the object's position for the next frame
    this.nextFrame = function() {
      if (this.x > width - 50 && this.xVel > 0) {
        this.xVel = 0;
      }
      if (this.x < 20 && this.xVel < 0) {
        this.xVel = 0;
      }
      if (this.y < 200 && this.yVel < 0) {
        this.yVel = 0;
      }
      if (this.y > height - 40 && this.yVel > 0) {
        this.yVel = 0;
      }
          this.x += this.xVel;
          if (this.x < width - 50) {
            if (rightPressed) {
            this.xVel += .7;
            }
            if (rightPressed === false && leftPressed === false && this.xVel > 0) {
              this.xVel += -.7;
            }};
          if (this.x > 20) {
            if (leftPressed) {
              this.xVel += -.7;
            }
            if (rightPressed === false && leftPressed === false && this.xVel < 0) {
              this.xVel += .7;
            }};
        
          if (this.y < height - 40) {
            this.y += this.yVel;
            this.yVel += .7;
          }
          if (this.y >= height - 40) {
            this.y = height - 40;
            if (upPressed) {
            this.yVel += -15;
            this.y += this.yVel;
            }};
            // if (upPressed === false && downPressed === false &&  this.yVel < 0) {
            //   this.yVel += .7;
            // }};
          // if (this.y < 600) {
          //   if (downPressed) {
          //     this.yVel += .7;
          //   }
          //   if (upPressed === false && downPressed === false && this.yVel > 0) {
          //     this.yVel += -.7;
          //   }}; 
          
          // accounts for the small discrepancy that the velocity function can't fix
          if (this.xVel < .7 && this.xVel > -.7) {
            this.xVel = 0;
          }
          if (this.yVel < .7 && this.yVel > -.7) {
            this.yVel = 0;
          } console.log(this.x, this.xVel, this.y, this.yVel);
      
    
}
} 
frameRender = function() 
{
    // Clear view
    context.clearRect(0, 0, width, height + 20);
    
    // For each object in the physicalObjects array...
    for (var i = 0; i < physicalObjects.length; i++) {
        
        // Draw a rectangle on the canvas to represent the object, based on the object's x, y, width and height
        context.fillRect(
            physicalObjects[i].x, 
            physicalObjects[i].y, 
            physicalObjects[i].width, 
            physicalObjects[i].height
        );
            
        // Tell the object to update itself for the next frame
        physicalObjects[i].nextFrame();
        
    }
} 
     
frameRenderLoop = function() 
{
    // Use requestAnimationFrame to trigger the 'frameRenderLoop' function as soon as the browser is ready to repaint
    requestAnimationFrame(frameRenderLoop);
        
    // Render the current frame
    frameRender();
}

  var rightPressed = false;
  var leftPressed = false;
  var upPressed = false;
  var downPressed = false;
  document.onkeydown = function(event) {
    if (event.key === "ArrowRight") {
      rightPressed = true;
    };
    if (event.key === "ArrowLeft") {
      leftPressed = true;
    };
    if (event.key === "ArrowUp") {
      upPressed = true;
    };
    if (event.key === "ArrowDown") {
      downPressed = true;
    };
  }
  document.onkeyup = function(event) {
    if (event.key === "ArrowRight") {
      rightPressed = false;
    };
    if (event.key === "ArrowLeft") {
      leftPressed = false;
    };
    if (event.key === "ArrowUp") {
      upPressed = false;
    };
    if (event.key === "ArrowDown") {
      downPressed = false;
    };
  };

// Start the render loop
frameRenderLoop(); 
     
// Add an object into the engine at x: 100, y: 100, with a width and height of 20 pixels.
physicalObjects.push(new PhysicalObject(200, 200, 20, 20));  
       
// Give it a little push!
// physicalObjects[0].addXVel(0.1);

// function screenLoop(obj) 
// {    
//     // Drifted off of right edge 
//     if (obj.x - (obj.width / 2) > canvas.width)
//         obj.x = -obj.width / 2;
    
//     // Drifted off of left edge
//     if (obj.x + (obj.width / 2) < 0)
//         obj.x = canvas.width + obj.width / 2;
    
//     // Drifted off of bottom edge 
//     if (obj.y - (obj.height / 2) > canvas.height)
//         obj.y = -obj.height / 2;
    
//     // Drifted off of top edge
//     if (obj.y + (obj.height / 2) < 0)
//         obj.y = canvas.height + obj.height / 2;
// }