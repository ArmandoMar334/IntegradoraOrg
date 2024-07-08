import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

export default function ControlScreen() {
  const [brainWaveData, setBrainWaveData] = useState({
    labels: ["1s", "2s", "3s", "4s", "5s", "6s"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // color de la línea
        strokeWidth: 2, // grosor de la línea
      }
    ],
    legend: ["Ondas cerebrales"]
  });

  // Función para simular actualización de datos cada cierto intervalo
  useEffect(() => {
    const interval = setInterval(() => {
      // Generar datos aleatorios para las ondas cerebrales
      const newData = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100));
      const newLabels = ["1s", "2s", "3s", "4s", "5s", "6s"];

      setBrainWaveData({
        labels: newLabels,
        datasets: [
          {
            data: newData,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // color de la línea
            strokeWidth: 2, // grosor de la línea
          }
        ],
        legend: ["Ondas cerebrales"]
      });
    }, 1000); // Actualiza cada 1 segundo

    return () => clearInterval(interval); // Limpiar intervalo en el desmontaje
  }, []);

  // Memoizar el componente LineChart para evitar re-renderizaciones innecesarias
  const MemoizedLineChart = useMemo(() => React.memo(() => (
    <LineChart
      data={brainWaveData}
      width={Dimensions.get('window').width * 0.8} // 80% del ancho de la pantalla
      height={200} // Altura del gráfico ajustada
      chartConfig={chartConfig}
      bezier
      style={styles.graph}
    />
  )), [brainWaveData]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Panel de Control</Text>
      
      <View style={styles.buttonRow}>
        <FontAwesome.Button
          name="arrow-up"
          backgroundColor="#3b5998"
          onPress={() => console.log('Mover Arriba')}
          style={styles.button}
        >
          Arriba
        </FontAwesome.Button>
      </View>

      <View style={styles.buttonRow}>
        <FontAwesome.Button
          name="arrow-left"
          backgroundColor="#3b5998"
          onPress={() => console.log('Mover Izquierda')}
          style={styles.button}
        >
          Izquierda
        </FontAwesome.Button>
        <FontAwesome.Button
          name="stop"
          backgroundColor="#d9534f"
          onPress={() => console.log('Detener')}
          style={styles.button}
        >
          Detener
        </FontAwesome.Button>
        <FontAwesome.Button
          name="arrow-right"
          backgroundColor="#3b5998"
          onPress={() => console.log('Mover Derecha')}
          style={styles.button}
        >
          Derecha
        </FontAwesome.Button>
      </View>

      <View style={styles.buttonRow}>
        <FontAwesome.Button
          name="arrow-down"
          backgroundColor="#3b5998"
          onPress={() => console.log('Mover Abajo')}
          style={styles.button}
        >
          Abajo
        </FontAwesome.Button>
      </View>

      <Text style={styles.graphHeader}>Ondas Cerebrales</Text>
      <View style={styles.graphContainer}>
        <MemoizedLineChart />
      </View>
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726"
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    marginHorizontal: 10,
  },
  graphHeader: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
  graphContainer: {
    alignItems: 'center', // Centrar el gráfico horizontalmente
  },
  graph: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
