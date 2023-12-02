import React, { useCallback, useContext } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import modalStyles from '../assets/styles/modalStyles';
import AppContext from '../assets/globals/appContext';

function ClearFavouritesModal({ clearFavoritesModal, onRequestClose }) {
  const context = useContext(AppContext);

  const onClear = useCallback(() => {
    onRequestClose();
    context.clearFavorites();
  }, [context, onRequestClose]);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={clearFavoritesModal}
      onRequestClose={onRequestClose}
    >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <Text style={modalStyles.modalText}>
            Вы уверены что вы хотите удалить все избранные рецепты?
          </Text>

          <View style={modalStyles.modalButtons}>
            <Pressable style={[modalStyles.button, modalStyles.buttonClear]} onPress={onClear}>
              <Text style={modalStyles.textStyle}>Да</Text>
            </Pressable>

            <Pressable
              style={[modalStyles.button, modalStyles.buttonClose]}
              onPress={onRequestClose}
            >
              <Text style={modalStyles.textStyle}>Нет</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ClearFavouritesModal;
