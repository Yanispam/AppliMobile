import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-elements';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  useEffect(() => { 
    if (searchQuery.trim() !== '') {
      searchCharacters();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const searchCharacters = async () => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${searchQuery}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleCharacterPress = (character) => {
    navigation.navigate('Details', { character });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un personnage..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCharacterPress(item)}>
              <Card containerStyle={styles.card}>
                <Card.Image source={{ uri: item.image }} style={styles.characterImage} />
                <Card.Title style={styles.characterContainer}>
                  <Text style={styles.characterName}>{item.name}</Text>
                </Card.Title>
              </Card>
            </TouchableOpacity>
          )}
        />
      )}
      {searchResults.length === 0 && (
        <Text style={styles.noResultsText}>Aucun résultat trouvé.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'tomato',
    flex: 1,
    padding: 5,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
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
  noResultsText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchScreen;
