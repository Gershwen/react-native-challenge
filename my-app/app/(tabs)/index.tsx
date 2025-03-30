import { useState, useEffect } from 'react';
import { Image, StyleSheet, FlatList, View } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Defining expected data type 
interface Post {
  id: number;
  title: string;
  body: string;
}

export default function HomeScreen() {
  // making use of useState to store posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // using try catch block for fetching json data and effective error handling
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <View>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Welcome!</ThemedText>
            <HelloWave />
          </ThemedView>
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        </View>
      }
      renderItem={({ item }) => (
        <ThemedView style={styles.postContainer}>
          <ThemedText type="subtitle">{item.title}</ThemedText>
          <ThemedText>{item.body}</ThemedText>
        </ThemedView>
      )}
      ListFooterComponent={loading ? <ThemedText>Loading...</ThemedText> : null}
    />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    alignSelf: 'center',
    marginBottom: 16,
  },
  postContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
