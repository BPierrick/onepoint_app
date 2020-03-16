import React from 'react';
import {StyleSheet, TouchableNativeFeedback, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {deleteElement} from '../state/actions';
import {ListItem} from 'react-native-elements';

interface ElementProps {
  id: string;
  value: string;
}

const Element: React.FC<ElementProps> = (props: ElementProps) => {
  const {value} = props;
  const dispatch = useDispatch();
  return (
    <ListItem
      title={value}
      rightIcon={
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}
          onPress={() => {
            dispatch(deleteElement(props.id));
          }}>
          <Image
            source={require('../../public/assets/png/delete_icon.png')}
            style={styles.deleteIcon}
          />
        </TouchableNativeFeedback>
      }
    />
  );
};

const styles = StyleSheet.create({
  deleteIcon: {
    width: 20,
    height: 20,
  },
});

export default Element;
