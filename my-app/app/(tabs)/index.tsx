import React, { useEffect, useState } from 'react';
import { Image, FlatList, StyleSheet, Platform, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { api } from '@/services/api';

interface ApiResponse {
  id: number;
  title: string;
  body: string;
}

export default function HomeScreen() {
  const [data, setData] = useState<ApiResponse[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1); // Track the current page
  const [hasMore, setHasMore] = useState<boolean>(true); // To check if there are more pages

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api(page); // Pass the current page to the API
        if (result.length < 10) {
          setHasMore(false); 
        }
        setData((prevData) => [...prevData, ...result]); // Append new data to existing data
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [page]); // Re-fetch data when the page changes
  
  // Handle loading more items when the user reaches the end of the list
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1); // Increment the page number to fetch next data
    }
  };

  if (loading && page === 1) {
    return <ThemedText>Loading...</ThemedText>;
  }

  if (error) {
    return <ThemedText>Error: {error}</ThemedText>;
  }

  // Render the data in a list
  return (
    <FlatList
      ListHeaderComponent={
        <>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Welcome!</ThemedText>
            <HelloWave />
          </ThemedView>
        </>
      }
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text>{item.title}</Text>
          <Text>{item.body}</Text>
        </View>
      )}
      onEndReached={handleLoadMore} // Trigger to load more data when reaching the end
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading && hasMore ? <ThemedText>Loading more...</ThemedText> : null} // Show a loading indicator when fetching more data
    />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  listContainer: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  listItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});
