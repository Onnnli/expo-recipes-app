import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

function NutritionField({ value = '', onChangeText, label }) {
  const [text, setText] = useState(value);

  return (
    <View style={{ flexDirection: 'row', marginTop: 10 }}>
      <Text
        style={{
          flex: 1,
          textTransform: 'capitalize',
          fontSize: 15,
          padding: 8,
        }}
      >
        {label}
      </Text>
      <TextInput
        style={{ flex: 1, fontSize: 15, borderColor: '#ccc', borderWidth: 1, padding: 8 }}
        placeholder="0"
        defaultValue={value}
        value={text}
        onBlur={() => onChangeText(text)}
        onChangeText={(upd) => {
          setText(upd);
          onChangeText(upd);
        }}
      />
    </View>
  );
}

export default NutritionField;
