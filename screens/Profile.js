import React, { useCallback, useContext, useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import globalStyles from '../assets/styles/globalStyles';
import AppContext from '../assets/globals/appContext';
import ClearFavouritesModal from '../components/ClearFavouritesModal';
import ProfilePhotoUploader from '../components/ProfilePhotoUploader';
import CustomButton from '../components/CustomButton';

export default function Profile({ navigation }) {
  const context = useContext(AppContext);
  const [clearFavoritesModal, setClearFavoritesModal] = useState(false);

  const onToggleModal = useCallback(() => {
    setClearFavoritesModal(!clearFavoritesModal);
  }, [clearFavoritesModal]);

  const onLogout = useCallback(async () => {
    await context.onLogout();

    navigation.navigate('Login');
  }, [context, navigation]);

  const onRemove = useCallback(async () => {
    await context.onRemoveProfile();

    navigation.navigate('Login');
  }, [context, navigation]);

  return (
    <ScrollView style={globalStyles.screen}>
      <ProfilePhotoUploader profile />

      <View style={styles.infoContainer}>
        <Text style={[styles.text, { fontWeight: '200', fontSize: 36 }]}>
          {context?.user?.name} {context?.user?.last_name}
        </Text>
      </View>

      <View style={styles.settingsContainer}>
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.settingContainer}
          onPress={() => navigation.push('MyRecipes')}
        >
          <View style={styles.settingIconContainer}>
            <Icon type="material-icons" name="lunch-dining" color="#020202" />
          </View>
          <Text style={[styles.settingLabel, { color: '#020202' }]}>Мои рецепты</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsContainer}>
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.settingContainer}
          onPress={onToggleModal}
        >
          <View style={styles.settingIconContainer}>
            <Icon type="material-icons" name="delete" color="#ff4040" />
          </View>
          <Text style={[styles.settingLabel, { color: '#ff4040' }]}>Clear Favorites</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsContainer}>
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.settingContainer}
          onPress={() => navigation.push('ProfileEdit')}
        >
          <View style={styles.settingIconContainer}>
            <Icon type="material-icons" name="edit" color="#020202" />
          </View>
          <Text style={[styles.settingLabel, { color: '#020202' }]}>Редактировать профиль</Text>
        </TouchableOpacity>
      </View>

      <CustomButton label="Выйти" onPress={onLogout} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 30,
        }}
      >
        <TouchableOpacity onPress={onRemove}>
          <Text style={{ color: '#FAAF3E', fontWeight: '700' }}>Удалить аккаунт</Text>
        </TouchableOpacity>
      </View>

      <ClearFavouritesModal
        clearFavoritesModal={clearFavoritesModal}
        onRequestClose={onToggleModal}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  dm: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: '#34FFB9',
    position: 'absolute',
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },

  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: '50%',
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.38)',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: '#CABFAB',
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
  settingsContainer: {
    margin: 8,
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2222',
    paddingVertical: 4,
    marginVertical: 4,
  },
  settingIconContainer: {
    padding: 4,
    paddingRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: '#222',
  },
});
