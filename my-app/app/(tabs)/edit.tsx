// import { StyleSheet, Image, Platform } from 'react-native';

// import { Collapsible } from '@/components/Collapsible';
// import { ExternalLink } from '@/components/ExternalLink';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { IconSymbol } from '@/components/ui/IconSymbol';

// export default function TabTwoScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
//       headerImage={
//         <IconSymbol
//           size={310}
//           color="#808080"
//           name="chevron.left.forwardslash.chevron.right"
//           style={styles.headerImage}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Explore</ThemedText>
//       </ThemedView>
//       <ThemedText>This app includes example code to help you get started.</ThemedText>
//       <Collapsible title="File-based routing">
//         <ThemedText>
//           This app has two screens:{' '}
//           <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
//           <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
//         </ThemedText>
//         <ThemedText>
//           The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
//           sets up the tab navigator.
//         </ThemedText>
//         <ExternalLink href="https://docs.expo.dev/router/introduction">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Android, iOS, and web support">
//         <ThemedText>
//           You can open this project on Android, iOS, and the web. To open the web version, press{' '}
//           <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
//         </ThemedText>
//       </Collapsible>
//       <Collapsible title="Images">
//         <ThemedText>
//           For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
//           <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
//           different screen densities
//         </ThemedText>
//         <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
//         <ExternalLink href="https://reactnative.dev/docs/images">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Custom fonts">
//         <ThemedText>
//           Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
//           <ThemedText style={{ fontFamily: 'SpaceMono' }}>
//             custom fonts such as this one.
//           </ThemedText>
//         </ThemedText>
//         <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Light and dark mode components">
//         <ThemedText>
//           This template has light and dark mode support. The{' '}
//           <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
//           what the user's current color scheme is, and so you can adjust UI colors accordingly.
//         </ThemedText>
//         <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Animations">
//         <ThemedText>
//           This template includes an example of an animated component. The{' '}
//           <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
//           the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText>{' '}
//           library to create a waving hand animation.
//         </ThemedText>
//         {Platform.select({
//           ios: (
//             <ThemedText>
//               The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
//               component provides a parallax effect for the header image.
//             </ThemedText>
//           ),
//         })}
//       </Collapsible>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   headerImage: {
//     color: '#808080',
//     bottom: -90,
//     left: -35,
//     position: 'absolute',
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
// });

import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '@/services/api';

export default function EditScreen() {
  const router = useRouter();
  const [newTitle, setNewTitle] = useState<string>('');
  const [newBody, setNewBody] = useState<string>('');
  const [postId, setPostId] = useState<string>(''); // For update/delete

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
      <Button title="Back to Home" onPress={() => router.push('/')} />
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
