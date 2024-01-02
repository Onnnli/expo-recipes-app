import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import baseURL from '../constants/baseUrl';

export default function FoodCategoryCard({ navigation, category }) {
  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.cardContainer}
        onPress={() =>
          navigation.push('FoodCategory', { name: category.name, id: category.id_category })
        }
      >
        <View style={styles.cardLabelContainer}>
          <Text style={styles.cardCategoryName}>{category.name}</Text>
        </View>

        <View style={styles.cardDeco1} />
        <View style={styles.cardDeco2} />

        <View style={styles.cardImageContainer}>
          <Image
            style={styles.cardImage}
            source={{ uri: `${baseURL}/public/images/${category.slug}.png` }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#FEA11F',
    overflow: 'hidden',
    borderRadius: 8,
    elevation: 4,
    height: 112,
  },
  cardLabelContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  cardCategoryName: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  cardImageContainer: {
    height: 112,
    aspectRatio: 2 / 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -8,
    marginRight: -48,
  },
  cardImage: {
    height: '200%',
    width: '100%',
    resizeMode: 'contain',
  },
  cardDeco1: {
    height: '150%',
    borderRadius: 1000,
    aspectRatio: 1,
    position: 'absolute',
    backgroundColor: '#fff3',
    left: '-10%',
    bottom: '-80%',
  },
  cardDeco2: {
    height: '100%',
    borderRadius: 1000,
    aspectRatio: 1,
    position: 'absolute',
    backgroundColor: '#fff2',
    right: 72,
    top: '-60%',
  },
});
