import React, { useContext, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import FoodCard from '../components/FoodCard';
import window from '../assets/controller/window';
import globalStyles from '../assets/styles/globalStyles';
import AppContext from '../assets/globals/appContext';

export default function Favorites({ navigation, route }) {
  const favorites = useContext(AppContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            padding: 8,
            backgroundColor: '#FEA11F',
            borderRadius: 100,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          activeOpacity={0.6}
          onPress={() => navigation.push(`ShopList`)}
        >
          <Icon type="material-icons" name="shopping-cart" color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
              <Text style={styles.emptyLabel}>У вас нет любимых рецептов!</Text>
              <Text style={styles.emptyLabelDetails}>Нажимайте на ❤️, чтобы увидеть их здесь!</Text>
            </View>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={favorites.foods}
            ListHeaderComponent={() => <View style={{ height: 12 }} />}
            ListFooterComponent={() => <View style={{ height: 12 }} />}
            renderItem={({ item }) => (
              <FoodCard navigation={navigation} route={route} recipe={item} />
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
    fontSize: 20,
    width: window.width / 1.5,
    maxWidth: 480,
  },
});
