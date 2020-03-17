import React, {useState, Dispatch, useRef} from 'react';
import {StyleSheet, TouchableNativeFeedback, Image} from 'react-native';
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
  const inputEl = useRef<Input>(null);

  return (
    <Card containerStyle={{padding: 0}}>
      <Input
        ref={inputEl}
        onChangeText={setInputValue}
        value={inputValue}
        placeholder="Type here"
        rightIcon={
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackground()}
            onPress={() => {
              setInputValue('');
              if (null !== inputEl.current) {
                inputEl.current.focus();
              }
            }}>
            <Image
              source={require('../../public/assets/png/delete_icon.png')}
              style={styles.deleteIcon}
            />
          </TouchableNativeFeedback>
        }
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

  deleteIcon: {
    width: 20,
    height: 20,
  },
});

export default CreateElementForm;
