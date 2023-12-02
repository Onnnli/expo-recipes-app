import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import AppContext from '../assets/globals/appContext';

export default function FavoriteButton({ id }) {
  const favorites = useContext(AppContext);

  if (favorites.favs.find((food) => food === id)) {
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => favorites.deleteFavorites(id)}>
        <Icon type="material-icons" name="favorite" color="#ff6060" size={40} />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => favorites.addFavorites(id)}>
      <Icon type="material-icons" name="favorite-outline" color="#666" size={40} />
    </TouchableOpacity>
  );
}
