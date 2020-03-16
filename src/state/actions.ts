export const ADD_ELEMENT_ACTION = 'ADD_ELEMENT_ACTION';
interface AddElementAction {
  type: 'ADD_ELEMENT_ACTION';
  id: string;
  element: string;
}
export function addElement(id: string, element: string): AddElementAction {
  return {
    type: ADD_ELEMENT_ACTION,
    id,
    element,
  };
}

export const DELETE_ELEMENT_ACTION = 'DELETE_ELEMENT_ACTION';
interface DeleteElementAction {
  type: 'DELETE_ELEMENT_ACTION';
  id: string;
}
export function deleteElement(id: string): DeleteElementAction {
  return {
    type: DELETE_ELEMENT_ACTION,
    id,
  };
}

export const DELETE_ALL_ELEMENTS_ACTION = 'DELETE_ALL_ELEMENTS_ACTION';
interface DeleteAllElementsAction {
  type: 'DELETE_ALL_ELEMENTS_ACTION';
}
export function deleteAllElements(): DeleteAllElementsAction {
  return {
    type: DELETE_ALL_ELEMENTS_ACTION,
  };
}

export const GET_DATA = 'GET_DATA';
interface GetDataAction {
  type: 'GET_DATA';
}
export function getData(): GetDataAction {
  return {
    type: GET_DATA,
  };
}

export type Action = AddElementAction | GetDataAction | DeleteElementAction | DeleteAllElementsAction;
