import React from 'react';

const Todoitem = (props) => {
    const handleDoneClick = ()=>{
        props.updateTodoItem(props.itemIndex);
    };

    const handleDeleteClick = () =>{
        props.deleteTodoItem(props.itemIndex);
    }

    return (
        <div className='mt-2'>
            {props.finished ? <strike className='mr-3'>{props.value}</strike> : <span className='mr-3'>{props.value}</span>}
            <button className='btn btn-success mr-1' onClick={handleDoneClick}>Done</button>
            <button className='btn btn-danger'onClick={handleDeleteClick}>Delete</button>
        </div>
    )
};

export default Todoitem;