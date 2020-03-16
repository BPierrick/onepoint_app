import React, {useEffect} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './src/state/reducer';
import middleware from './src/state/middleware';
import ElementContainer from './src/components/elementContainer';
import CreateElementForm from './src/components/createElementForm';
import {getData} from './src/state/actions';

const store = createStore(reducer, applyMiddleware(middleware));

const App = () => {
  //Invoked only at application launch (mount)
  //Gets all the backuped values
  useEffect(() => {
    store.dispatch(getData());
  }, []);

  return (
      <Provider store={store}>
        <CreateElementForm />
        <ElementContainer />
      </Provider>
  );
};

export default App;
