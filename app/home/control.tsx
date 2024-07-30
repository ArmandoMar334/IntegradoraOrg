
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { movement } from '../../scripts/moveCar';


export default function ControlScreen() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [tokenMessage, setTokenMessage] = useState<string | null>(null);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Control Panel</Text>
      <View style={styles.buttonRow}>
        <FontAwesome.Button
          name="arrow-up"
          backgroundColor="#3b5998"
          onLongPress={() => movement(true, "UP")}
          onPressOut={() => movement(false, "UP")}
          style={styles.button}
        >
          
        </FontAwesome.Button>
      </View>
      <View style={styles.buttonRow}>
        <FontAwesome.Button
          name="arrow-left"
          backgroundColor="#3b5998"
          onLongPress={() => movement(true, "LEFT")}
          onPressOut={() => movement(false, "LEFT")}

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
          onLongPress={() => movement(true, "RIGHT")}
          onPressOut={() => movement(false, "RIGHT")}
          style={styles.button}
        >
          
        </FontAwesome.Button>
      </View>
      <View style={styles.buttonRow}>
        <FontAwesome.Button
          name="arrow-down"
          backgroundColor="#3b5998"
          onLongPress={() => movement(true, "DOWN")}
          onPressOut={() => movement(false, "DOWN")}
          style={styles.button}
        >
          
        </FontAwesome.Button>
      </View>

      {tokenMessage && <Text style={styles.tokenMessage}>{tokenMessage}</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
    </ScrollView>

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

  tokenMessage: {
    color: 'green',
    textAlign: 'center',
    marginTop: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
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
