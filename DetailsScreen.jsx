import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { character } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.characterNameContainer}>
        <Text style={styles.characterName}>{character.name}</Text>
      </View>
      <Image source={{ uri: character.image }} style={styles.characterImage} />
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text>{character.status}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Species:</Text>
          <Text>{character.species}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Gender:</Text>
          <Text>{character.gender}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  characterNameContainer: {
    backgroundColor: 'tomato',
    padding: 20,
    marginTop: 50,
    marginBottom: 20,
    borderRadius: 10,
  },
  characterName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  characterImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsContainer: {
    width: '80%',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
});

export default DetailsScreen;
