import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import FoodCard from '../components/FoodCard';
import window from '../assets/controller/window';
import AppContext from '../assets/globals/appContext';
import globalStyles from '../assets/styles/globalStyles';

export default function Favorites({ navigation, route }) {
  const favorites = useContext(AppContext);
  console.log(favorites);

  return (
    <View style={globalStyles.screen}>
      <View>
        {favorites.foods.length <= 0 ? (
          <View style={styles.emptyContainer}>
            <Icon
              type="material-icons"
              name="favorite-outline"
              size={window.width / 3 > 240 ? 240 : window.width / 3}
              color="#bbb"
            />
            <View style={styles.emptyLabelContainer}>
              <Text style={styles.emptyLabel}>No Favorites Yet!</Text>
              <Text style={styles.emptyLabelDetails}>
                Click the heart icon in any food card or recipe and you'll see it here the next time
                you visit.
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={favorites.foods}
            ListHeaderComponent={() => (
              <View
                style={{
                  height: 12,
                }}
              />
            )}
            ListFooterComponent={() => (
              <View
                style={{
                  height: 12,
                }}
              />
            )}
            renderItem={({ item }) => (
              <FoodCard navigation={navigation} route={route} food={item} />
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 32,
    height: window.height / 3 + 16,
    maxHeight: 480,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyLabelContainer: {
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyLabel: {
    fontSize: window.width / 20 > 32 ? 32 : window.width / 20,
    fontWeight: 'bold',
    color: '#888',
  },
  emptyLabelDetails: {
    textAlign: 'center',
    marginVertical: 8,
    color: '#aaa',
    fontSize: window.width / 32 > 24 ? 24 : window.width / 32,
    width: window.width / 1.5,
    maxWidth: 480,
  },
});
