import React, { useCallback, useContext, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native';
import InputField from '../components/InputField';
import AppContext from '../assets/globals/appContext';
import CustomButton from '../components/CustomButton';
import globalStyles from '../assets/styles/globalStyles';
import ProfilePhotoUploader from '../components/ProfilePhotoUploader';

function ProfileEditScreen({ navigation }) {
  const context = useContext(AppContext);

  const [name, setName] = useState(context.user.name);
  const [lastName, setLastName] = useState(context.user.last_name);
  const [email, setEmail] = useState(context.user.email);
  const [password, setPassword] = useState(context.user.password);

  const onPress = useCallback(async () => {
    await context.onEdit({ name, lastName, email, password }, context.user.id_user);

    alert('Сохранено!');

    navigation.navigate('Profile');
  }, [context, email, lastName, name, navigation, password]);

  return (
    <ScrollView style={[globalStyles.screen, { padding: 30 }]}>
      <ProfilePhotoUploader />

      <InputField
        defaultValue={context.user.name}
        onChangeText={setName}
        label="Имя"
        icon={<Ionicons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
      />

      <InputField
        defaultValue={context.user.last_name}
        onChangeText={setLastName}
        label="Фамилия"
        icon={<Ionicons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
      />

      <InputField
        defaultValue={context.user.email}
        onChangeText={setEmail}
        label="Email"
        icon={
          <MaterialIcons name="alternate-email" size={20} color="#666" style={{ marginRight: 5 }} />
        }
        keyboardType="email-address"
      />

      <InputField
        defaultValue={context.user.password}
        onChangeText={setPassword}
        label="Пароль"
        icon={
          <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
        }
        inputType="password"
      />

      <CustomButton label="Сохранить" onPress={onPress} />
    </ScrollView>
  );
}

export default ProfileEditScreen;
