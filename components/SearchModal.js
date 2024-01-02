import React, { useCallback, useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { MultipleSelectList } from 'react-native-dropdown-select-list/index';
import window from '../assets/controller/window';
import { useRecipes } from '../hooks/useRecipes';

function SearchModal({ visible, onClose, ingredients, setSearchRecipe }) {
  const { searchByFilter } = useRecipes();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchText, setSearchText] = useState('');

  const onChangeSearch = useCallback((value) => {
    setSearchText(value.toLowerCase());
  }, []);

  const onSearchByFilter = useCallback(async () => {
    const result = await searchByFilter(selectedIngredients, searchText);
    setSearchRecipe(result);
    onClose();
  }, [onClose, searchByFilter, searchText, selectedIngredients, setSearchRecipe]);

  const normalizeIngredients = useMemo(
    () =>
      ingredients.reduce((acc, el) => {
        acc.push({
          key: el.id_ingredient,
          value: el.name,
        });

        return acc;
      }, []),
    [ingredients]
  );

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.viewport}>
        <View style={styles.viewWrapper}>
          <View style={styles.viewContainer}>
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Pressable onPress={onClose}>
                  <Icon type="material-icons" name="highlight-off" size={28} color="grey" />
                </Pressable>
              </View>
            </View>

            <ScrollView style={styles.descriptionContainer}>
              <Text style={styles.title}>Фильтр</Text>
              <View style={styles.divider} />

              <View style={styles.searchFieldContainer}>
                <Icon
                  type="material-icons"
                  name="search"
                  color="#666"
                  style={{ marginHorizontal: 15 }}
                />

                <TextInput
                  style={styles.searchField}
                  placeholder="Поиск по названию..."
                  onChangeText={onChangeSearch}
                  value={searchText}
                />
              </View>

              <MultipleSelectList
                searchicon={<Icon type="material-icons" name="search" color="#666" />}
                boxStyles={{ borderWidth: 0, backgroundColor: '#4080f018' }}
                inputStyles={styles.searchField}
                placeholder="Выбрать ингредиент"
                badgeStyles={{ backgroundColor: '#FEA11F' }}
                searchPlaceholder="Найти ингредиент"
                notFoundText="Ничего не найдено"
                data={normalizeIngredients}
                selectedItem={selectedIngredients}
                setSelected={(val) => setSelectedIngredients(val)}
                label="Ингредиенты"
              />

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  style={{
                    padding: 3,
                    backgroundColor: '#FEA11F',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 250,
                    height: 50,
                  }}
                  activeOpacity={0.6}
                  onPress={onSearchByFilter}
                >
                  <Text style={{ color: '#fff' }}>Найти</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewport: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#222c',
  },
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 4,
    overflow: 'hidden',
    maxWidth: window.width - 64,
    maxHeight: window.height - 64,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#4444',
    backgroundColor: '#f8f8f8',
  },
  iconContainer: {
    marginLeft: 'auto',
    aspectRatio: 1,
    padding: 4,
  },
  descriptionContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#444',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#2222',
    marginVertical: 16,
  },
  content: {
    textAlign: 'justify',
    fontSize: 16,
    color: '#222',
    paddingBottom: 32,
  },
  searchFieldContainer: {
    width: window.width - 90,
    paddingVertical: 4,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4080f018',
    marginBottom: 10,
  },
  searchField: {
    border: 'none',
    textAlignVertical: 'center',
    paddingRight: 8,
    fontSize: 16,
    flex: 1,
    color: '#646464',
    padding: 5,
  },
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

export default SearchModal;
