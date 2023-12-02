import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import { discoverFoods } from '../assets/controller/query';
import DiscoverSeeAll from './DiscoverSeeAll';
import HorizontalCard from './HorizontalCards';

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export default function HorizontalCardsContainer({ navigation, route, foodCategory }) {
  const [foods, setFoods] = useState([]);
  const [discover, setDiscover] = useState([]);

  useEffect(() => {
    discoverFoods(foodCategory.name)
      .then((data) => {
        setFoods(data);
        setDiscover(shuffle(data).splice(0, data.length < 5 ? data.length : 5));
      })
      .catch((error) => {
        alert(error);
      });
  }, [foodCategory]);

  return (
    <View style={styles.cardsContainer}>
      <View style={styles.cardsLabelContainer}>
        <Text style={styles.foodCategoryName}>{foodCategory.name.toUpperCase()}</Text>
        {discover.length >= 5 && (
          <DiscoverSeeAll navigation={navigation} route={route} foodType={foodCategory.name} />
        )}
      </View>
      <View style={styles.divider} />
      <FlatList
        style={styles.cards}
        keyExtractor={discover.id}
        data={discover}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <HorizontalCard
            navigation={navigation}
            route={route}
            food={item}
            color={foodCategory.color != null ? foodCategory.color : `#FEA11F`}
          />
        )}
        ListHeaderComponent={
          <View
            style={{
              width: 12,
            }}
          />
        }
        ListFooterComponent={
          <View
            style={{
              width: 12,
            }}
          />
        }
      />
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardsContainer: {
    marginVertical: 2,
  },
  cards: {
    paddingBottom: 4,
  },
  cardsLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  foodCategoryName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    flex: 1,
  },
  divider: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#2221',
    marginTop: 6,
    marginBottom: 4,
  },
});
