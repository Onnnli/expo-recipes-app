import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

function CustomButton({ label, onPress, disabled }) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        backgroundColor: '#FAAF3E',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
