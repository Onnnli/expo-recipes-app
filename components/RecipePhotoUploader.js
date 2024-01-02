import React, { useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker/src/ImagePicker';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function RecipePhotoUploader({ photo, setPhoto, setPhotoResult }) {
  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 1 });

    if (result && !result?.canceled) {
      const filename = result?.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf('/') + 1,
        result?.assets[0].uri.length
      );

      delete result.cancelled;
      result = {
        ...result,
        name: filename,
      };

      setPhoto(result.assets[0].uri);
      setPhotoResult(result);
    }
  };

  return (
    <View style={{ alignSelf: 'center' }}>
      <View>
        {photo && (
          <Image style={{ width: 300, height: 300 }} source={{ uri: photo }} resizeMode="cover" />
        )}
      </View>

      <TouchableOpacity onPress={handleChoosePhoto} style={styles.add}>
        <Text style={{ fontSize: 17 }}>Изменить фото</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  add: {
    borderColor: '#FEA11F',
    borderWidth: 1,
    width: 150,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  image: {
    height: undefined,
    width: undefined,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
});

export default RecipePhotoUploader;
