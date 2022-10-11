import React from 'react';

import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext();

function TodoProvider(props) {
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
    } = useLocalStorage('TODOS_V1', []);

    const [searchValue, setSearchValue] = React.useState('');

    const [openModal, setOpenModal] = React.useState(false);

    const completedTodos = todos.filter((todo) => todo.completed).length;
    const totalTodos = todos.length;

    let searchedTodos = [];

    if (searchValue.length < 1) {
        searchedTodos = todos;
    } else {
        searchedTodos = todos.filter((todo) =>
            todo.text.toLowerCase().includes(searchValue.toLowerCase())
        );
    }

    const toggleCompleted = (text) => {
        const todoIndex = todos.findIndex((todo) => todo.text === text);
        if (todoIndex !== -1) {
            const newTodos = [...todos];
            newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
            saveTodos(newTodos);
        }
    };

    const deleteTodo = (text) => {
        saveTodos([...todos].filter((todo) => todo.text !== text));
    };

    const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
            completed: false,
            text,
        });
        saveTodos(newTodos);
    };

    return (
        <TodoContext.Provider
            value={{
                error,
                loading,
                total: totalTodos,
                completed: completedTodos,
                searchValue,
                setSearchValue,
                searchedTodos,
                toggleCompleted,
                deleteTodo,
                openModal,
                setOpenModal,
                addTodo,
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider };
