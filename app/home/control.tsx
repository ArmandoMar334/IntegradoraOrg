import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { movement, useController } from '../../scripts/moveCar';

export default function ControlScreen() {
  const [isRunning, setIsRunning] = useState(false);

  const handlePress = () => {
    const newRunningState = !isRunning;
    setIsRunning(newRunningState);
    console.log('Button state:', newRunningState ? 'OFF' : 'ON');
    newRunningState ? useController(false) : useController(true);
  };

  
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [tokenMessage, setTokenMessage] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Control Panel</Text>
      <View style={styles.buttonRow}>
        <FontAwesome.Button
          name="arrow-up"
          backgroundColor="#3b5998"
          onLongPress={() => movement(true, "UP")}
          onPressOut={() => movement(false, "UP")}
          style={styles.button}
        />
      </View>
      <View style={styles.buttonRow}>
        <FontAwesome.Button
          name="arrow-left"
          backgroundColor="#3b5998"

          onLongPress={() => movement(true, "LEFT")}
          onPressOut={() => movement(false, "LEFT")}
          style={styles.button}
        />
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
        />
      </View>
      <View style={styles.buttonRow}>
        <FontAwesome.Button
          name="arrow-down"
          backgroundColor="#3b5998"
          onLongPress={() => movement(true, "DOWN")}
          onPressOut={() => movement(false, "DOWN")}
          style={styles.button}
        />
      </View>
      {tokenMessage && <Text style={styles.tokenMessage}>{tokenMessage}</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

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

    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  button: {
    marginHorizontal: 15,
    width: 75,
    height: 75,
    justifyContent: 'center',
    margin: 10
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
