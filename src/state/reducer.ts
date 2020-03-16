import {
  Action,
  ADD_ELEMENT_ACTION,
  DELETE_ELEMENT_ACTION,
  DELETE_ALL_ELEMENTS_ACTION,
} from './actions';

export interface ReducerState {
  elements: {[id: string]: string};
}

const initialState: ReducerState = {
  elements: {},
};

function reducer(
  state: ReducerState = initialState,
  action: Action,
): ReducerState {
  switch (action.type) {
    case ADD_ELEMENT_ACTION:
      const elements = {...state.elements};
      elements[action.id] = action.element;
      return {
        ...state,
        elements,
      };

    case DELETE_ELEMENT_ACTION: {
      const elements = {...state.elements};
      if (!delete elements[action.id]) {
        return state;
      }
      return {
        ...state,
        elements,
      };
    }

    case DELETE_ALL_ELEMENTS_ACTION: {
      return {
        ...state,
        elements: {},
      };
    }

    default:
      return state;
  }
}

export default reducer;
