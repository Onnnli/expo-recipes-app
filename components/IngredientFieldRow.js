import React, { useCallback, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

function IngredientFieldRow({
  normalizeIngredients,
  onRemove,
  onSelectIngredient,
  index,
  onChangeAmount,
  initialValue,
  hideDeleteButton = false,
}) {
  const [select, setSelect] = useState(initialValue?.ingredient || null);
  const [amount, setAmount] = useState(initialValue?.amount || '');

  const onDelete = useCallback(() => {
    setSelect(null);

    onRemove();
  }, [onRemove]);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Dropdown
        style={{
          flex: 2,
          borderBottomColor: '#FEA11F',
          borderBottomWidth: 1,
          paddingHorizontal: 5,
        }}
        placeholderStyle={{ fontSize: 17, color: '#ccc' }}
        selectedTextStyle={{ fontSize: 17, color: '#000', textTransform: 'capitalize' }}
        data={normalizeIngredients}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Название ингредиета"
        searchPlaceholder="Найти ингредиент..."
        value={select}
        onChange={(item) => {
          setSelect(item.value);
          onSelectIngredient(index, item.value);
        }}
      />

      <TextInput
        placeholder="Количество"
        style={{
          flex: 1,
          paddingVertical: 8.5,
          fontSize: 17,
          paddingHorizontal: 10,
          borderBottomColor: '#FEA11F',
          borderBottomWidth: 1,
        }}
        value={amount}
        onBlur={() => onChangeAmount(index, amount)}
        onChangeText={(value) => {
          setAmount(value);
          onChangeAmount(index, value);
        }}
      />
      {!hideDeleteButton && (
        <TouchableOpacity style={{ paddingLeft: 7 }} onPress={onDelete}>
          <Icon name="delete" color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default IngredientFieldRow;
