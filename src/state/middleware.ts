import {
  ADD_ELEMENT_ACTION,
  Action,
  addElement,
  GET_DATA,
  DELETE_ELEMENT_ACTION,
  DELETE_ALL_ELEMENTS_ACTION,
} from './actions';
import {Middleware, MiddlewareAPI, Dispatch, AnyAction} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {ReducerState} from './reducer';

const middleware: Middleware = (
  store: MiddlewareAPI<Dispatch<Action>, ReducerState>,
) => next => (action: Action) => {
  switch (action.type) {
    case ADD_ELEMENT_ACTION:
      const state = store.getState();
      AsyncStorage.setItem(
        action.id,
        JSON.stringify({
          index: Object.keys(state.elements).length.toString(),
          value: action.element,
          id: action.id,
        }),
      )
        .then(() => {
          console.log('ITEM SAVED: ', action.element);
          next(action);
        })
        .catch(console.error);
      break;

    case GET_DATA: {
      AsyncStorage.getAllKeys()
        .then(keys => {
          AsyncStorage.multiGet(keys)
            .then(keyValueArray => {
              const elements: Array<{
                index: string;
                id: string;
                value: string;
              }> = [];
              keyValueArray.forEach(keyValue => {
                if (null !== keyValue[1]) {
                  console.log(keyValue);
                  const elementsObj: {
                    index: string;
                    value: string;
                    id: string;
                  } = JSON.parse(keyValue[1]);
                  elements.push(elementsObj);
                }
              });
              elements.sort((a, b) => {
                const index1 = parseInt(a.index);
                const index2 = parseInt(b.index);
                if (!isNaN(index1) && !isNaN(index2)) {
                  return index1 < index2 ? -1 : 1;
                } else {
                  console.warn(
                    'Error: AsyncStorage index value attribute is not convertible to number type',
                  );
                  return 0;
                }
              });
              elements.forEach(elementsObj =>
                next(addElement(elementsObj.id, elementsObj.value)),
              );
            })
            .catch(console.error);
        })
        .catch(console.error);
      break;
    }

    case DELETE_ELEMENT_ACTION: {
      AsyncStorage.removeItem(action.id)
        .then(() => {
          console.log('ITEM REMOVED FROM STORAGE');
          next(action);
        })
        .catch(console.error);
      break;
    }

    case DELETE_ALL_ELEMENTS_ACTION: {
      AsyncStorage.clear()
        .then(() => {
          console.log('CLEARED ALL ELEMENTS');
          next(action);
        })
        .catch(console.error);
    }

    default:
      break;
  }
  next(action);
};

export default middleware;
