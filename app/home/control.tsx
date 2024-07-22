import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
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
          Up
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
          Left
        </FontAwesome.Button>
        <FontAwesome.Button
          name="stop"
          backgroundColor="#d9534f"
          onPress={() => console.log('Stop')}
          style={styles.button}
        >
          Stop
        </FontAwesome.Button>
        <FontAwesome.Button
          name="arrow-right"
          backgroundColor="#3b5998"
          onLongPress={() => movement(true, "RIGHT")}
          onPressOut={() => movement(false, "RIGHT")}
          style={styles.button}
        >
          Right
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
          Down
        </FontAwesome.Button>
      </View>

      {tokenMessage && <Text style={styles.tokenMessage}>{tokenMessage}</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
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
