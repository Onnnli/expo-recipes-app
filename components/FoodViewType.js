import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default function FoodViewType({ navigation, foodType }) {
  return (
    <View style={styles.typeWrapper}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.typeContainer}
        onPress={() => {
          navigation.push('FoodCategory', {
            name: foodType.Categorie.name,
            id: foodType.Categorie.id_category,
          });
        }}
      >
        <Text style={styles.typeText}>{foodType.Categorie.name.toLowerCase()}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  typeWrapper: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  typeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
    elevation: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEA11F',
  },
  typeText: {
    color: '#fff',
    margin: 'auto',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
