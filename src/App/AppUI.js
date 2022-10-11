import React from 'react';

import { TodoContext } from '../TodoContext/index.js';

import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch/index.js';
import { TodoList } from '../TodoList/index.js';
import { TodoItem } from '../TodoItem/index.js';
import { CreateTodoButton } from '../CreateTodoButton';
import { Modal } from '../Modal/index.js';
import { TodoForm } from '../TodoForm/index.js';

function AppUI() {
    const {
        error,
        loading,
        searchedTodos,
        toggleCompleted,
        deleteTodo,
        openModal,
        setOpenModal,
    } = React.useContext(TodoContext);

    return (
        <React.Fragment>
            <TodoCounter />
            <TodoSearch />
            <TodoList>
                {error && <p>Desesperate, hubo un error</p>}
                {loading && <p>Estamos cargando, no desesperes</p>}
                {!loading && !searchedTodos.length && (
                    <p>Crea tu primer TODO</p>
                )}

                {searchedTodos.map((todo) => (
                    <TodoItem
                        text={todo.text}
                        key={todo.text}
                        completed={todo.completed}
                        toggleCompleted={() => {
                            toggleCompleted(todo.text);
                        }}
                        deleteTodo={() => {
                            deleteTodo(todo.text);
                        }}
                    />
                ))}
            </TodoList>

            {openModal && (
                <Modal>
                    <TodoForm />
                </Modal>
            )}

            <CreateTodoButton
                setOpenModal={setOpenModal}
                openModal={openModal}
            />
        </React.Fragment>
    );
}

export { AppUI };
