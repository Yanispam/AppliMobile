import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const RickAndMortyComponent = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCharacters();
    loadFavorites();
  }, [page]);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
      setCharacters(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleCharacterPress = (character) => {
    navigation.navigate('Details', { character });
  };

  const handleToggleFavorite = async (character) => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favoriteCharacters');
      let favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];

      const isFavorite = favoritesArray.some((fav) => fav.id === character.id);

      if (isFavorite) {
        favoritesArray = favoritesArray.filter((fav) => fav.id !== character.id);
      } else {
        favoritesArray.push(character);
      }

      await AsyncStorage.setItem('favoriteCharacters', JSON.stringify(favoritesArray));
      setFavorites(favoritesArray);
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favoriteCharacters');
      const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavorites(favoritesArray);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardContainer}>
        {characters.map((character) => (
          <TouchableOpacity
            key={character.id}
            onPress={() => handleCharacterPress(character)}
          >
            <Card containerStyle={styles.card}>
              <Card.Image source={{ uri: character.image }} style={styles.characterImage} />
              <Card.Title style={styles.characterContainer}>
                <Text style={styles.characterName}>{character.name}</Text>
              </Card.Title>
              <TouchableOpacity
                onPress={() => handleToggleFavorite(character)}
                style={styles.favoriteButton}
              >
                <Ionicons
                  name={favorites.some((fav) => fav.id === character.id)
                    ? 'heart'
                    : 'heart-outline'}
                  size={24}
                  color="tomato"
                />
              </TouchableOpacity>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.paginationContainer}>
        <TouchableOpacity style={styles.paginationButton} onPress={handlePrevPage}>
          <Text style={styles.paginationButtonText}>Précédent</Text>
        </TouchableOpacity>
        <Text style={styles.pageNumber}>{page}</Text>
        <TouchableOpacity style={styles.paginationButton} onPress={handleNextPage}>
          <Text style={styles.paginationButtonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'tomato',
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
  },
  characterName: {
    color: 'tomato',
    textAlign: 'center',
  },
  characterContainer: {
    alignItems: 'center',
  },
  characterImage: {
    borderRadius: 10,
  },
  characterContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 15,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  paginationButton: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  paginationButtonText: {
    color: 'tomato',
    fontWeight: 'bold',
  },
  pageNumber: {
    marginHorizontal: 5,
    fontWeight: 'bold',
    color: 'white',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default RickAndMortyComponent;
