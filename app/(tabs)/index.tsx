import { Image, StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.headerContainer}>
          <Image
            source={require('@/assets/images/Blue.png')}
            style={styles.reactLogo}
          />
          
        </View>
      }>
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>¡Bienvenido!</ThemedText>
        <ThemedText style={styles.paragraph}>
          Bienvenido a nuestro innovador proyecto de carrito a control remoto. Este carrito puede ser controlado mediante ondas cerebrales con una diadema o con el teléfono. Nuestro objetivo es proporcionar una herramienta útil y accesible para ayudar a personas con discapacidades motoras. Esperamos que encuentres este proyecto inspirador y útil. ¡Gracias por unirte a nosotros en esta emocionante aventura tecnológica!
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    marginLeft: 100,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  title: {
    marginBottom: 16,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2a9d8f',
    textAlign: 'center',
  },
  paragraph: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 24,
    color: '#264653',
  },
  photo: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 2,
    borderColor: 'white',
  },
  reactLogo: {
    height: 400,
    width: 400,
    marginLeft: -300,
    marginRight: 400,
    marginTop: -30,
    
  },
});
