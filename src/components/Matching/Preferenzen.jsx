import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
};
  
const grid = 8;
  
const getItemStyle = (item, isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    fontFamily: "asdfasdf",
    color: item.highlighted ? "red" : "#5318FA",
    opacity: item.done ? (item.highlighted ? 1 : 0.5 ) : 1,
    border : item.matched ? "1px solid black" :  "none",
    margin: `0 ${grid}px 0 0`,
    // change background colour if dragging
    //background: isDragging ? "lightgreen" : "grey",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });
  
  const getListStyle = (isDraggingOver, itemsLength) => ({
    display: "flex",
    padding: grid,
    width: '100%'
  });
  // 4/ 4x4 


function Preferenzen(props) {

    const onDragEnd = (index, result) => {
        // dropped outside the list
        if (!result.destination) {
        return;
        }

        let temp = [...props.matrix];
        temp[index] = reorder(
            props.matrix[index],
            result.source.index,
            result.destination.index
        );
        //console.log(temp)
        props.setMatrix(temp)
    }

    
    return (
        <div style={{overflow: "scroll"}}>
            {props.matrix.map((row, i) => (
                <>
                    <div style={{ display: "flex", alignItems: "center", }}>

                        <h3 style={{ "minWidth": "50px" }}>{props.letter}<sub>{i}</sub>:</h3>

                        <DragDropContext onDragEnd={(obj) => onDragEnd(i, obj)}>
                            <Droppable
                                isDropDisabled={props.calculated} 
                                droppableId="droppable"
                                direction="horizontal">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver, row.length)}
                                        {...provided.droppableProps}
                                    >
                                        {row.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            item, 
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                    >
                                                        {item.content}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </>
            ))}
                                    
        </div>
    )
}

export default Preferenzen