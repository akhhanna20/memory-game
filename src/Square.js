import React from 'react';

const Square = (props) => {
    const style = {
        background: "lightgreen",
        border: '2px solid black',
        fontSize: '65px',
        cursor: 'pointer',
        textAlign: 'center',
        borderRadius: "10px",
        outline: 'none',
    }

    return (
        <div style={style}
             onClick={() => props.cardHandler(props.card.id, props.card.value)}

        >
            {props.card.isOpen ? props.card.value : null}

        </div>
    );
};

export default Square;