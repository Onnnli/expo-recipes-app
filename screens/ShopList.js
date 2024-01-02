import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../assets/styles/globalStyles';
import { useRecipes } from '../hooks/useRecipes';
import baseUrl from '../constants/baseUrl';
import CreateShoppingListModal from '../components/CreateShoppingListModal';
import window from '../assets/controller/window';

function ShopList({ navigation }) {
  const { getAllIngredients } = useRecipes();
  const [shoppingList, setShoppingList] = useState([]);
  const [allIngr, setAllIngr] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    (async function () {
      const shop = await AsyncStorage.getItem('shop');
      const shopL = JSON.parse(shop) || [];
      setShoppingList(shopL);
      const ingr = await getAllIngredients();
      setAllIngr(ingr);
    })();
  }, [getAllIngredients]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            padding: 6,
            backgroundColor: '#FEA11F',
            borderRadius: 100,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          activeOpacity={0.6}
          onPress={() => setOpenModal(true)}
        >
          <Icon type="material-icons" name="add" color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const onAdd = useCallback(
    async (field) => {
      setShoppingList((prevState) => [...prevState, ...field]);
      setOpenModal(false);

      const item = JSON.stringify(shoppingList.concat(field));
      await AsyncStorage.setItem('shop', item);
    },
    [shoppingList]
  );

  console.log(shoppingList, 'shoppingList');

  const normalize = shoppingList.reduce((acc, el) => {
    console.log(allIngr);
    const qq = allIngr.find((elw) => elw.id_ingredient === el.ingredient);

    const found = acc?.find((accEl) => accEl.ingredient === el.ingredient);
    console.log(found);
    if (!found) {
      el.name = qq?.name;
      el.slug = qq?.slug;
      el.amount = +el.amount;
      acc.push(el);

      return acc;
    }

    const newEl = {
      ...found,
      amount: found.amount + +el.amount,
    };

    const newAcc = acc.filter((accEl) => accEl.ingredient !== el.ingredient);

    newAcc.push(newEl);

    return newAcc;
  }, []);

  const onDelete = useCallback(
    async (ingredientId) => {
      const deleteShop = shoppingList.filter((el) => el.ingredient !== ingredientId);
      const data = JSON.stringify(deleteShop);

      await AsyncStorage.setItem('shop', data);

      setShoppingList(deleteShop);
    },
    [shoppingList]
  );

  return (
    <ScrollView style={[globalStyles.screen, { padding: 30 }]}>
      <View>
        {normalize.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon
              type="material-icons"
              name="favorite-outline"
              size={window.width / 3 > 240 ? 240 : window.width / 3}
              color="#bbb"
            />
            <View style={styles.emptyLabelContainer}>
              <Text style={styles.emptyLabel}>В списке покупок пусто!</Text>
              <Text style={styles.emptyLabelDetails}>Добавьте продукты нажав на ➕!</Text>
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}
          >
            <Text style={{ width: 100, fontSize: 17 }}>Имя</Text>
            <Text style={{ width: 100, fontSize: 17 }}>Количество</Text>
          </View>
        )}

        {normalize.map((ingredient) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}
            key={ingredient.ingredient}
          >
            <Text style={{ width: 100, textTransform: 'capitalize' }}>{ingredient.name}</Text>
            <Text style={{ width: 50 }}>{ingredient.amount}</Text>

            <Image
              style={{ height: 50, width: 50 }}
              source={{ uri: `${baseUrl}/public/images/${ingredient.slug}.png` }}
            />

            <TouchableOpacity
              style={{ paddingLeft: 7 }}
              onPress={() => onDelete(ingredient.ingredient)}
            >
              <Icon name="delete" color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <CreateShoppingListModal
        onAdd={onAdd}
        onClose={() => setOpenModal(false)}
        visible={openModal}
      />
    </ScrollView>
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

export default ShopList;
