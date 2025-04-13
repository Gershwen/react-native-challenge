import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '@/services/api';

export default function EditScreen() {
  const router = useRouter();
  const [newTitle, setNewTitle] = useState<string>('');
  const [newBody, setNewBody] = useState<string>('');
  const [postId, setPostId] = useState<string>(''); 

  const createPost = async () => {
    if (!newTitle || !newBody) {
      Alert.alert('Error', 'Title and body are required');
      return;
    }
    try {
      await api.post({ title: newTitle, body: newBody });
      Alert.alert('Success', 'Post created');
      setNewTitle('');
      setNewBody('');
    } catch {
      Alert.alert('Error', 'Could not create post');
    }
  };

  const updatePost = async () => {
    if (!postId) {
      Alert.alert('Error', 'Enter Post ID to update');
      return;
    }
    try {
      await api.put(Number(postId), { title: newTitle, body: newBody });
      Alert.alert('Success', 'Post updated');
    } catch {
      Alert.alert('Error', 'Could not update post');
    }
  };

  const deletePost = async () => {
    if (!postId) {
      Alert.alert('Error', 'Enter Post ID to delete');
      return;
    }
    try {
      await api.delete(Number(postId));
      Alert.alert('Success', 'Post deleted');
    } catch {
      Alert.alert('Error', 'Could not delete post');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Back to Home" onPress={() => router.push('/index')} />
      <TextInput
        placeholder="Post ID (for update/delete)"
        value={postId}
        onChangeText={setPostId}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Title"
        value={newTitle}
        onChangeText={setNewTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Body"
        value={newBody}
        onChangeText={setNewBody}
        style={styles.input}
      />
      <Button title="Create Post" onPress={createPost} />
      <Button title="Update Post" onPress={updatePost} />
      <Button title="Delete Post" onPress={deletePost} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
});
