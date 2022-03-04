import React from 'react';
import Square from "./Square";

const Board = (props) => {
    const style = {
        width: '450px',
        height: '350px',
        margin: '0 auto',
        display: 'grid',
        gridTemplate: 'repeat(3, 1fr) / repeat(4, 1fr)',
        border: '2px solid black'
    }

    return (
        <div style={style}>
            {props.field.map(el =>
                <Square
                    key={el.id}
                    card={el}
                    cardHandler={props.cardHandler}
                />)}

        </div>
    );
};

export default Board;