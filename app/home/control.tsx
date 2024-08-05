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
      <Text style={styles.header}>Control Remoto</Text>
      <View style={styles.buttonRow}>
        <FontAwesome.Button
          name="arrow-up"
          backgroundColor="#0d5c81"
          size={35}
          onLongPress={() => movement(true, "UP")}
          onPressOut={() => movement(false, "UP")}
          style={styles.button}
        />
      </View>
      
      <View style={styles.buttonRow}>
        <div style={{ marginRight: '15px' }}>
          <FontAwesome.Button
            name="arrow-left"
            backgroundColor="#0d5c81"
            size={35}
            onLongPress={() => movement(true, "LEFT")}
            onPressOut={() => movement(false, "LEFT")}
            style={styles.button}
          />
        </div>
        
        <FontAwesome.Button
          name={isRunning ? "play" : "stop"}
          backgroundColor={isRunning ? "#5cb85c" : "#d9534f"}
          size={20}
          borderRadius={155}
          onPress={handlePress}
          style={styles.button}
        >
          {isRunning ? "ON" : "OFF"}
        </FontAwesome.Button>

        <div style={{ marginLeft: '15px'}}>
          <FontAwesome.Button
            name="arrow-right"
            backgroundColor="#0d5c81"
            size={35}
            onLongPress={() => movement(true, "RIGHT")}
            onPressOut={() => movement(false, "RIGHT")}
            style={styles.button}
          />
        </div>
      </View>
      
      <View style={styles.buttonRow}>
        <FontAwesome.Button
          name="arrow-down"
          backgroundColor="#0d5c81"
          size={35}
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
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    color: '#0d5c81',
  },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 15,
    marginBottom: 15,    
    justifyContent: 'space-between'
  },
  button: {
    paddingHorizontal: 18,
    marginHorizontal: 10,
    width: 85,
    height: 95,
    justifyContent: 'center',
    shadowColor: '#000',
    padding: 10,  
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
});
