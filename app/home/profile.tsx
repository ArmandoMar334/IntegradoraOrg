// ProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';


const ProfileScreen = () => {  
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      // Elimina los datos de sesión si es necesario
      sessionStorage.removeItem('email');
      // Redirigir a la página de inicio de sesión
      router.replace('/'); // Asegúrate de que 'Index' sea el nombre correcto de tu ruta de inicio de sesión
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/usuarios.png')}  style={styles.image}/>      
      <Text style={styles.title}>Usuario</Text>
     
      <Text style={styles.label}>{sessionStorage.getItem('email')}</Text>

      <Text style={styles.separator}></Text>

      <FontAwesome.Button
        name="sign-out"
        backgroundColor="#d9534f"
        size={30}
        onPress= {handleLogout}
        style={styles.button}>
        Salir
      </FontAwesome.Button>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#042654',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#154360',
  },
  button: {
    marginHorizontal: 30,
  },
  separator: {
    height: 35,
    width: '100%',
    backgroundColor: '#FFFFF',
    marginVertical: 5,
  }
});

export default ProfileScreen;
