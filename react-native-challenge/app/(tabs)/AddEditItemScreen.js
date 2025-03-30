import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem, updateItem } from '../redux/dataSlice';

const AddEditItemScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(route.params?.item?.title || '');
  const isEditing = Boolean(route.params?.item);

  const handleSubmit = () => {
    if (title.trim() === '') return Alert.alert('Error', 'Title cannot be empty');

    if (isEditing) {
      dispatch(updateItem({ id: route.params.item.id, title }));
    } else {
      dispatch(addItem({ id: Date.now(), title }));
    }
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title={isEditing ? "Update" : "Add"} onPress={handleSubmit} />
    </View>
  );
};
export default AddEditItemScreen;