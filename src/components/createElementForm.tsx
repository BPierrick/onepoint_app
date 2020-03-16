import React, {useState, Dispatch} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {Input, Button, Card} from 'react-native-elements';
import {addElement, Action} from '../state/actions';

function createId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

const CreateElementForm: React.FC = () => {
  function onPressButton(value: string, dispatch: Dispatch<Action>) {
    dispatch(addElement(createId(), value));
  }
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  return (
    <Card containerStyle={{padding: 0}}>
      <Input
        onChangeText={setInputValue}
        value={inputValue}
        placeholder="Type here"
      />
      <Button
        title="Add Element"
        type="outline"
        containerStyle={styles.buttonContainer}
        onPress={() => {
          onPressButton(inputValue, dispatch);
        }}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default CreateElementForm;
