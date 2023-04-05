import React, { useState } from 'react'
import { Stage, Layer, Group, Text, Rect } from 'react-konva'


function KVDiagram(){
return(

      

        <Stage width={window.innerWidth/2} height={window.innerHeight/2}>
            <Layer>
              
                <Rect
                  x={20}
                  y={50}
                  width={100}
                  height={100}
                  fill="red"
                  shadowBlur={10}
                />
            </Layer>
          </Stage>                   
     
    )
}

export default KVDiagram
  
