
import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, View, Text, Button } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { api } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ApiResponse {
  id: number;
  title: string;
  body: string;
}

export default function HomeScreen() {
  const [data, setData] = useState<ApiResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await api.get(1);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // store data in AsyncStorage
    const storeData = async (value) => {
        console.log('storeData', value);
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('my-key', jsonValue);
      } catch (e) {
        console.error(e)
      }
    };

  useEffect(() => {
    storeData(data);
  }, [data]);


  // Re-fetch data when screen is focused (after returning from edit page)
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.title}</Text>
            <Text>{item.body}</Text>
            <Button
              title="Edit"
              onPress={() => router.push(`/edit/${item.id}`)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listItem: {
      display: 'flex',
      flexDirection: 'column',
      gap:10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },

});
