import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import tableStyles from '../assets/styles/tableStyles';

export default function FoodRecipeDetails({ details }) {
  return (
    <View style={[styles.wrapper, tableStyles.container, tableStyles.border]}>
      <Text style={tableStyles.title}>Details</Text>
      {details.description && <Text style={tableStyles.description}>{details.description}</Text>}
      <View style={tableStyles.twoColumns}>
        <Text style={tableStyles.leftColumn}>Preparation Time</Text>
        <Text style={tableStyles.rightColumn}>{details.time.prep}</Text>
      </View>
      <View style={tableStyles.twoColumns}>
        <Text style={tableStyles.leftColumn}>Cooking Time</Text>
        <Text style={tableStyles.rightColumn}>{details.time.cook}</Text>
      </View>
      <View style={tableStyles.twoColumns}>
        <Text style={tableStyles.leftColumn}>Total Time</Text>
        <Text style={tableStyles.rightColumn}>{details.time.total}</Text>
      </View>
      {details.serving && (
        <View style={tableStyles.twoColumns}>
          <Text style={tableStyles.leftColumn}>Serving</Text>
          <Text style={tableStyles.rightColumn}>{details.servings}</Text>
        </View>
      )}
      {details.calories && (
        <View style={tableStyles.twoColumns}>
          <Text style={tableStyles.leftColumn}>Calories</Text>
          <Text style={tableStyles.rightColumn}>{details.calories}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
  },
});
