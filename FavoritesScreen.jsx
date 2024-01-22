import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = () => {
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused(); 


  useEffect(() => {
    
    const loadFavorites = async () => {
      try {
        
        const savedFavorites = await loadFavoritesFromStorage();
        setFavoriteCharacters(savedFavorites);
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    
    if (isFocused) {
      loadFavorites();
    }
  }, [isFocused]);  

  const loadFavoritesFromStorage = async () => {
    try {
      
      const favoritesFromStorage = await AsyncStorage.getItem('favoriteCharacters');
      return JSON.parse(favoritesFromStorage) || [];
    } catch (error) {
      throw new Error('Error loading favorites from storage:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardContainer}>
        {favoriteCharacters.map((character) => (
          <TouchableOpacity
            key={character.id}
            onPress={() => navigation.navigate('Details', { character })}
          >
            <Card containerStyle={styles.card}>
              <Card.Image source={{ uri: character.image }} style={styles.characterImage} />
              <Card.Title style={styles.characterContainer}>
                <Text style={styles.characterName}>{character.name}</Text>
              </Card.Title>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 175,
    height: 220,
    borderRadius: 10,
    margin: 10,
    backgroundColor: 'tomato'
  },
  characterName: {
    color: 'white',
    textAlign: 'center',
  },
  characterContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  characterImage: {
    borderRadius: 10,
  },
});

export default FavoritesScreen;
