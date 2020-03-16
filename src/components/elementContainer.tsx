import React from 'react';
import {ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {ReducerState} from '../state/reducer';
import Element from './element';
import {Card, Button} from 'react-native-elements';
import {deleteAllElements} from '../state/actions';

const ElementContainer: React.FC<{}> = () => {
  const elements = useSelector((state: ReducerState) => state.elements);
  const elementArray = Object.entries(elements);
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Card containerStyle={{padding: 0}}>
        <>
          {elementArray.map((element, index) => {
            return <Element key={index} id={element[0]} value={element[1]} />;
          })}
          <Button
            title="Delete All"
            type="solid"
            disabled={elementArray.length < 1}
            buttonStyle={{backgroundColor: 'red'}}
            onPress={() => dispatch(deleteAllElements())}
          />
        </>
      </Card>
    </ScrollView>
  );
};

export default ElementContainer;
