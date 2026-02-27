class Display {
  constructor(){
    
  }
  
  show(p){
    fill(255);
    //ellipse(p.pos.x, p.pos.y, 16)
    push()
    translate(width/2,0)
    fill(12,12,200)
    rect(0,0,width/2,height/2)
    fill(12,50,12)
    rect(0,height/2,width/2,height/2)
    
    let numOfRays = p.rays.length;
    let rectWidth =  (width/2)/numOfRays
    
    let adjustedFacingAngle = p.facingAngle - p.fovAngle/2
    let startAngle = p.facingAngle
    let offSet = 0
    //print(rectWidth)
    for (let ray of p.rays) {
      
      
      let angleDistance = abs(adjustedFacingAngle - startAngle)
      let adjustedRaylength= ray.length * cos(radians(angleDistance))
      let wallHeight = height/adjustedRaylength * 15
      
      
     // print(p.facingAngle +","+ startAngle +" , "+ wallHeight +',' +adjustedFacingAngle)
      fill(map(wallHeight,0,height, 0, 255))
      stroke(map(wallHeight,0,height, 0, 255))
      rect(0+offSet, height/2 - (wallHeight /2), rectWidth,wallHeight);
      offSet+=rectWidth;
      startAngle -= p.increments;
    
    }
    pop()
  }
  
}
