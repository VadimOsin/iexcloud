import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {DragDropContext} from 'react-beautiful-dnd';
import store from './store';
import App from './App';

ReactDOM.render(
    <Provider store={store}>
            <DragDropContext>
                <App/>
            </DragDropContext>

    </Provider>,
    document.getElementById('root')
);