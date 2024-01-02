import React, { useCallback } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import modalStyles from '../assets/styles/modalStyles';
import { useRecipes } from '../hooks/useRecipes';

function DeleteRecipeModal({ isOpen, onRequestClose, recipe }) {
  const { deleteMyRecipe } = useRecipes();

  const onDelete = useCallback(async () => {
    await deleteMyRecipe(recipe.id_recipe);

    alert('Рецепт удален!');
    onRequestClose();
  }, [deleteMyRecipe, onRequestClose, recipe.id_recipe]);

  return (
    <Modal animationType="fade" transparent visible={isOpen} onRequestClose={onRequestClose}>
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <Text style={modalStyles.modalText}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Вы уверены что вы хотите удалить рецепт "{recipe.name}"?
          </Text>

          <View style={modalStyles.modalButtons}>
            <Pressable style={[modalStyles.button, modalStyles.buttonClear]} onPress={onDelete}>
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

export default DeleteRecipeModal;
