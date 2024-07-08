import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/Yel.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.contentContainer}>
        <Animatable.Text animation="fadeIn" duration={2000} style={[styles.title, { fontSize: 24, fontWeight: 'bold', color: '#333' }]}>
          ¡Bienvenido!
        </Animatable.Text>
        <Animatable.Text animation="fadeInUp" duration={2000} delay={500} style={styles.paragraph}>
          Bienvenido a nuestro innovador proyecto de carrito a control remoto. Este carrito puede ser controlado mediante ondas cerebrales con una diadema o con el teléfono. Nuestro objetivo es proporcionar una herramienta útil y accesible para ayudar a personas con discapacidades motoras. Esperamos que encuentres este proyecto inspirador y útil. ¡Gracias por unirte a nosotros en esta emocionante aventura tecnológica!
        </Animatable.Text>
        <Animatable.Text animation="fadeInUp" duration={2000} delay={1000} style={styles.paragraph}>
          Además, nuestro equipo está comprometido con la mejora continua y la incorporación de nuevas tecnologías para hacer que este proyecto sea aún más efectivo y fácil de usar. Creemos firmemente en el poder de la tecnología para cambiar vidas y estamos emocionados de compartir este viaje contigo.
        </Animatable.Text>
        <Animatable.Image
          animation="zoomIn"
          duration={2000}
          delay={1500}
          source={require('@/assets/images/equipo.jpg')}
          style={styles.photo}
        />
        <Animatable.Text animation="fadeInUp" duration={2000} delay={2000} style={styles.imageCaption}>
          En la imagen anterior, puedes ver a nuestro dedicado equipo de desarrolladores y expertos en tecnología que han trabajado arduamente para hacer realidad este proyecto. Cada miembro del equipo aporta una valiosa experiencia y pasión por la innovación.
        </Animatable.Text>
        <Animatable.Text animation="fadeInUp" duration={2000} delay={2500} style={styles.paragraph}>
          Nos encantaría saber tu opinión y recibir tus comentarios sobre cómo podemos mejorar aún más. No dudes en ponerte en contacto con nosotros si tienes alguna pregunta o sugerencia. ¡Gracias por tu apoyo!
        </Animatable.Text>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F5F5F5',
  },
  title: {
    marginBottom: 24,
  },
  paragraph: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  imageCaption: {
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 24,
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
  },
  photo: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginVertical: 16,
  },
  reactLogo: {
    height: 200,
    width: 400,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
