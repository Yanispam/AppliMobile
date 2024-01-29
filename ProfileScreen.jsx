import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission refusée. Vous devez autoriser l\'accès à la bibliothèque média pour choisir une image.');
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (result.cancelled) {
        
        return;
      }
  
      setProfileImage(result.uri);
    } catch (error) {
      console.error('Erreur lors du choix de l\'image:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text >Tu peux changer ta photo de profil en cliquant dessus</Text>
        <Text style={styles.username}>benito_212</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Biographie</Text>
        <Text style={styles.sectionContent}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Coordonnées</Text>
        <Text style={styles.sectionContent}>Email: utilisateur@example.com</Text>
        <Text style={styles.sectionContent}>Téléphone: +123 456 7890</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato', 
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', 
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white', 
  },
  sectionContent: {
    fontSize: 16,
    color: 'white', 
  },
});

export default ProfileScreen;
