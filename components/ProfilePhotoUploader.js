import React, { useCallback, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker/src/ImagePicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image, StyleSheet, View } from 'react-native';

import AppContext from '../assets/globals/appContext';
import baseURL from '../constants/baseUrl';

function ProfilePhotoUploader({ profile }) {
  const context = useContext(AppContext);

  console.log(context.user, ' context.user');

  const createFormData = (photo) => {
    const data = new FormData();

    data.append('image', {
      name: `${new Date()}_image_profile`,
      uri: photo.assets[0].uri,
      type: photo.assets[0].type,
    });

    return data;
  };

  const [photo, setPhoto] = React.useState(
    context?.user?.image ? `${baseURL}/${context.user.image}` : null
  );

  const upload = useCallback(
    async (result) => {
      await context.onAddProfilePhoto(createFormData(result));
    },
    [context]
  );

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

      await upload(result);
    }
  };

  return (
    <View style={{ alignSelf: 'center' }}>
      <View style={styles.profileImage}>
        {!photo ? (
          <Image
            source={require('../assets/images/no-image.png')}
            style={styles.image}
            resizeMode="center"
          />
        ) : (
          <Image style={styles.image} source={{ uri: photo }} resizeMode="cover" />
        )}
      </View>

      {!profile && (
        <View style={styles.add}>
          <Ionicons
            onPress={handleChoosePhoto}
            name="ios-add"
            size={48}
            color="#DFD8C8"
            style={{ marginTop: 6, marginLeft: 2 }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  add: {
    backgroundColor: '#41444B',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
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

export default ProfilePhotoUploader;
