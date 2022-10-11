import React from 'react';
import './TodoItem.css';

function TodoItem({ text, completed, toggleCompleted, deleteTodo }) {
    return (
        <li className="TodoItem">
            <span
                className={`Icon Icon-check 
                ${completed && 'Icon-check--active'}`}
                onClick={toggleCompleted}
            >
                √
            </span>
            <p className={`TodoItem-p ${completed && 'TodoItem-p--complete'}`}>
                {text}
            </p>
            <span className="Icon Icon-delete" onClick={deleteTodo}>
                X
            </span>
        </li>
    );
}

export { TodoItem };
