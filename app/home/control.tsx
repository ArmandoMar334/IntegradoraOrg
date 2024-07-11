import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { movement } from '../../scripts/moveCar';

export default function ControlScreen() {
  // // Datos de ejemplo para las ondas cerebrales
  // const brainWaveData = {
  //   labels: ["1s", "2s", "3s", "4s", "5s", "6s"],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 80, 99, 43],
  //       color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // color de la línea
  //       strokeWidth: 2, // grosor de la línea
  //     }
  //   ],
  //   legend: ["Ondas cerebrales"]
  // };
  const [isRunning, setIsRunning] = useState(false);

  const handlePress = () => {
    const newRunningState = !isRunning;
    setIsRunning(newRunningState);
    console.log('Button state:', newRunningState ? 'OFF' : 'ON');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Panel de Control</Text>
      <Text style={styles.text}> Controla el dispositivo a traves de los siguientes botones</Text>
      <View style={styles.buttonRowUpDown}>
        <FontAwesome.Button
          name="arrow-up"
          backgroundColor="#3b5998"
          borderRadius={55}
          size={40}
          onLongPress={() => movement(true,"UP")}
          onPressOut={() => movement(false,"UP")}
          // onPress={() => console.log('Move Up')}
          style={styles.button}
        >
          
        </FontAwesome.Button>
      </View>

      <View style={styles.buttonRow}>
        <FontAwesome.Button
          name="arrow-left"
          backgroundColor="#3b5998"
          borderRadius={55}
          size={40}
          onLongPress={() => movement(true,"LEFT")}
          onPressOut={() => movement(false,"LEFT")}
          style={styles.button}
        >
        
        </FontAwesome.Button>

        <FontAwesome.Button
         name={isRunning ? "play" : "stop"}
         backgroundColor={isRunning ? "#5cb85c" : "#d9534f"}
         size={20}
         onPress={handlePress}
         style={styles.button}
       >
         {isRunning ? "ON" : "OFF"}
       </FontAwesome.Button>

        <FontAwesome.Button
          name="arrow-right"
          backgroundColor="#3b5998"
          borderRadius={55}
          size={40}
          onLongPress={() => movement(true,"RIGHT")}
          onPressOut={() => movement(false,"RIGHT")}
          style={styles.button}
        >
          
        </FontAwesome.Button>
      </View>
      
      <View style={styles.buttonRowUpDown}>
        <FontAwesome.Button
          name="arrow-down"
          backgroundColor="#3b5998"
          borderRadius={55}
          size={40}
          onLongPress={() => movement(true,"DOWN")}
          onPressOut={() => movement(false,"DOWN")}
          // onPress={() => console.log('Move Down')}
          style={styles.button}
        >
          
        </FontAwesome.Button>
      </View>

      {/* <Text style={styles.graphHeader}>Ondas Cerebrales</Text>
      <View style={styles.graphContainer}>
        <LineChart
          data={brainWaveData}
          width={Dimensions.get('window').width * 0.8} // 80% del ancho de la pantalla
          height={200} // Altura del gráfico ajustada
          chartConfig={chartConfig}
          bezier
          style={styles.graph}
        />
      </View> */}
    </View>
  );
}

// const chartConfig = {
//   backgroundGradientFrom: "#ffffff",
//   backgroundGradientTo: "#ffffff",
//   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//   labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//   style: {
//     borderRadius: 16,
//   },
//   propsForDots: {
//     r: "6",
//     strokeWidth: "2",
//     stroke: "#ffa726"
//   }
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonRowUpDown: {
    flexDirection: 'row', 
    paddingHorizontal: 10,
    marginHorizontal: 15,
    marginBottom: 10, 
  },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 15,
    marginBottom: 15,    
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingHorizontal: 10,
    marginHorizontal: 15,
    width: 75,
    height: 95,
    shadowColor: '#fff',
    shadowOpacity: 0.9,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  // graphHeader: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   marginVertical: 20,
  // },
  // graphContainer: {
  //   alignItems: 'center', // Centrar el gráfico horizontalmente
  // },
  // graph: {
  //   marginVertical: 8,
  //   borderRadius: 16,
  // },
});
