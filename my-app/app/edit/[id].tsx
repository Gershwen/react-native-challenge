
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { api } from '@/services/api';

export default function EditPostScreen() {
  const { id } = useLocalSearchParams(); // Get dynamic post ID
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postId = Number(id);
        if (isNaN(postId)) throw new Error('Invalid post ID');
    
        console.log(`Fetching post with ID: ${postId}`);
    
        const response = await api.getPostById(postId);
        console.log('API Response:', response);
    
        setTitle(response.title);
        setBody(response.body);
      } catch (error) {
        console.error('Error fetching post:', error);
        Alert.alert('Error', 'Could not fetch post details');
      } finally {
        setLoading(false);
      }
    };
    

    if (id) fetchPost();
  }, [id]);

  const updatePost = async () => {
    if (!title || !body) {
      Alert.alert('Error', 'Title and body cannot be empty');
      return;
    }

    try {
      const postId = Number(id); // Convert to number
      if (isNaN(postId)) throw new Error('Invalid post ID');

      Alert.alert('Success', 'Post updated successfully', [
        { text: 'OK', onPress: () => router.push('/') },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Could not update post');
    }
  };

  if (loading) return <Text>Loading post...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Post {id}</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        multiline
      />
      <Button title="Save Changes" onPress={updatePost} />
      <Button title="Cancel" onPress={() => router.push('/')} color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
