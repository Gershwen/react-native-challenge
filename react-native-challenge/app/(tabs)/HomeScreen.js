import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../services/api';
import { deleteItem } from '../redux/dataSlice';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, loading, refreshing } = useSelector(state => state.data);

  useEffect(() => { fetchData(dispatch); }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button title="Add New Item" onPress={() => navigation.navigate('AddItem')} />
      {loading && <ActivityIndicator size="large" />}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.title}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('EditItem', { item })} />
            <Button title="Delete" onPress={() => dispatch(deleteItem(item.id))} color="red" />
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => fetchData(dispatch)} />}
      />
    </View>
  );
};
export default HomeScreen;