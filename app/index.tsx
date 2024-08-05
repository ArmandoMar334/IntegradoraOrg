import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Modal, Pressable, Image } from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';


export default function IndexScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Cambiar a 'string | null'
  const [modalVisible, setModalVisible] = useState(false);

  //Variables del formulario de registro
  const [emailForm, setEmailForm] = useState('');
  const [passwordForm, setPasswordForm] = useState('');
  const [errorForm, setErrorForm] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      // Inicia sesión con Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in');
      setError(null); // Limpiar el error si el login es exitoso
      sessionStorage.setItem('email', email);
      router.replace('/home');
    } catch (error: any) { // Especificar 'any' para el catch
      console.error('Error logging in:', error);
      setError(error.message || 'Error logging in'); // Asegurarse de que 'message' exista
    }
  };

  const handleSignUp = async () => {
    try {
      // Crea el usuario con Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, emailForm, passwordForm);
      const user = userCredential.user;

      console.log('User signed up and data saved:', user);
      setModalVisible(false); // Cerrar el modal al registrarse
      setEmailForm('');
      setPasswordForm('');
      setErrorForm(null);

    } catch (error: any) { // Especificar 'any' para el catch
      console.error('Error signing up:', error);
      setErrorForm(error.message || 'Error signing up'); // Asegurarse de que 'message' exista
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.loginIcon}
        source={require('@/assets/images/Yel.png')}
      />
      <Text style={styles.header}>Login</Text>
      <Text style={styles.textcontainer}>Registrate o Inicia sesión</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <FontAwesome.Button
        name="user"
        onPress={handleLogin}
        style={styles.button}>
        Inicia Sesión
      </FontAwesome.Button>

      <Text style={styles.separator}></Text>

      <FontAwesome.Button
        name="user-plus"
        backgroundColor="#d9534f"
        onPress={() => setModalVisible(true)}
        style={styles.button}>
        Registrate
      </FontAwesome.Button>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(false)}>
              <Ionicons name="close" style={styles.closeModal} size={28} />
            </Pressable>
            <Text style={styles.header}>Registro</Text>

            {errorForm && <Text style={styles.error}>{errorForm}</Text>}
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              value={emailForm}
              onChangeText={setEmailForm}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={passwordForm}
              onChangeText={setPasswordForm}
              secureTextEntry
            />
            <Text style={styles.separator}></Text>
            <FontAwesome.Button
              name="user-plus"
              backgroundColor="#008FFF"
              onPress={handleSignUp}
              style={styles.button}>
              Registrate
            </FontAwesome.Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 34,
    textAlign: 'center',
    marginBottom: 20,
    color: '#042654',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '##154360',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 5,    
    fontWeight: 'bold'
  },
  textcontainer: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#042654',
  },
  textModal: {
    color: '#FFFFFF',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 45,
    paddingTop: 72,
    paddingBottom: 55,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  separator: {
    height: 5,
    width: '100%',
    backgroundColor: '#FFFFF',
    marginVertical: 5,
  },
  closeModal: {
    color: "black",
    position: "absolute",
    top: -30,
    right: -120,
    zIndex: 1000,
    padding: 10,
  },
  loginIcon: {
    width: 250,
    height: 150,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  button: {
    marginHorizontal: 30,
  }
});
