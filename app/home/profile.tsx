import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { auth, firestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function profile() {

  const ProfileScreen = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const currentUser = auth.currentUser;
          if (currentUser) {
            const userDoc = await getDoc(doc(firestore, 'users', currentUser.uid));
            if (userDoc.exists()) {
              setUser(userDoc.data());
            } else {
              console.log('No such document!');
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }, []);

    if (loading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (!user) {
      return (
        <View style={styles.container}>
          <Text>No user data found</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Image
          style={styles.loginIcon}
          source={require('@/assets/images/Yel.png')} />

        <Image style={styles.userImage}
          source={require('@/assets/images/usuarios.png')} />
        <Text style={styles.title}>Usuario</Text>

        <Text style={styles.title}>Profile</Text>
        <Image source={{ uri: user.photoURL }} style={styles.avatar} />
        <Text style={styles.label}>Name: {user.displayName}</Text>
        <Text style={styles.label}>Email: {user.email}</Text>
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
      marginBottom: 16,
    },
    userImage: {
      width: 150,
      height: 150,
      borderRadius: 50,
      marginBottom: 100,
    },
    loginIcon: {
      width: 250,
      height: 150,
      marginBottom: 100,
      resizeMode: 'contain',
    },
    label: {
      fontSize: 18,
      marginBottom: 10,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
    },
  });
}