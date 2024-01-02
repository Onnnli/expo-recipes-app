import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import tableStyles from '../assets/styles/tableStyles';
import baseUrl from '../constants/baseUrl';

export default function FoodIngredient({ ingredient, sortId }) {
  return (
    <View style={styles.ingredientContainer}>
      <View style={styles.ingredientNumberContainer}>
        <Text style={styles.ingredientNumber}>{sortId}</Text>
      </View>
      <View style={styles.ingredientImageContainer}>
        <View
          style={{
            height: '100%',
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            style={styles.ingredientImage}
            source={{ uri: `${baseUrl}/public/images/${ingredient.Ingredient.slug}.png` }}
          />
        </View>
      </View>
      <View style={styles.ingredientDetails}>
        <View style={[tableStyles.container, tableStyles.border, { marginTop: 8, width: '100%' }]}>
          <View style={[styles.twoColumns, styles.rowDivider]}>
            <Text style={styles.leftColumn}>Ингредиент</Text>
            <Text style={styles.rightColumn}>{ingredient.Ingredient.name}</Text>
          </View>
          <View style={styles.twoColumns}>
            <Text style={styles.leftColumn}>Количество</Text>
            <Text style={styles.rightColumn}>{ingredient.amount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ingredientContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 6,
    elevation: 2,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    width: '100%',
  },
  ingredientNumberContainer: {
    height: 112,
    width: 48,
    backgroundColor: '#36C464',
  },
  ingredientNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#FFC02D',
    aspectRatio: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    elevation: 2,
  },
  ingredientImageContainer: {
    aspectRatio: 1,
    height: 72,
    padding: 4,
  },
  ingredientImage: {
    resizeMode: 'contain',
    aspectRatio: 1,
    height: '100%',
  },
  ingredientDetails: {
    padding: 8,
    flex: 1,
    height: '100%',
  },
  twoColumns: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#444',
  },
  leftColumn: {
    flex: 1,
    textAlign: 'right',
    textAlignVertical: 'center',
    paddingHorizontal: 8,
    fontWeight: 'bold',
    borderRightWidth: 1,
    fontSize: 12,
  },
  rightColumn: {
    flex: 3,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontStyle: 'italic',
    flexWrap: 'wrap',
    fontSize: 12,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderColor: '#222',
  },
});
