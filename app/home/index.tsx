import { Image, StyleSheet, Platform, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0d5c81', dark: '#0d5c81' }}
      headerImage={
        <Image
          source={require('@/assets/images/Yel.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>¡Bienvenido!</ThemedText>
        <ThemedText style={styles.paragraph}>
        <p><strong> Bienvenido a nuestro revolucionario proyecto de control remoto cerebral!</strong></p> 
        
        <p>Presentamos un automotor que puedes controlar con la 
        mente usando una diadema <strong>EEG</strong> o mediante tu teléfono móvil. <br />        
        Diseñado para transformar la movilidad de personas con discapacidades motoras, 
        este proyecto no solo es innovador, sino también increíblemente accesible. </p>

        <p>Únete a nosotros en esta emocionante aventura tecnológica y 
        descubre cómo estamos redefiniendo la independencia y la accesibilidad.</p>

        <p><strong>¡Gracias por ser parte de esta inspiradora revolución!</strong></p>
        </ThemedText>
        <Image
          source={require('@/assets/images/equipo.jpg')}
          style={styles.photo}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    marginBottom: 16,
    color: '#0d5c81'
  },
  paragraph: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 16,
  },
  photo: {
    width: 250,
    height: 250,
  },
  reactLogo: {
    position: 'absolute',
    top: 0,
    width: 400,
    height: 200,
    resizeMode: 'contain',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
});
