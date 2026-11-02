import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native';

export default function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const resultAnim = useRef(new Animated.Value(0)).current;

  // Run animation when app starts
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const calculate = (operation) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      Alert.alert('Error', 'Please enter valid numbers');
      return;
    }

    let answer;

    switch (operation) {
      case 'add':
        answer = a + b;
        break;

      case 'subtract':
        answer = a - b;
        break;

      case 'multiply':
        answer = a * b;
        break;

      case 'divide':
        if (b === 0) {
          Alert.alert('Error', 'Cannot divide by zero');
          return;
        }
        answer = a / b;
        break;

      default:
        return;
    }

    setResult(answer.toString());

    // Result animation
    resultAnim.setValue(0);

    Animated.spring(resultAnim, {
      toValue: 1,
      friction: 4,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>

      {/* Animated Title */}
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        Simple Calculator
      </Animated.Text>

      {/* Animated Calculator */}
      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Enter first number"
          keyboardType="numeric"
          value={num1}
          onChangeText={setNum1}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter second number"
          keyboardType="numeric"
          value={num2}
          onChangeText={setNum2}
        />

        <View style={styles.button}>
          <Button
            title="Addition (+)"
            onPress={() => calculate('add')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Subtraction (-)"
            onPress={() => calculate('subtract')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Multiplication (×)"
            onPress={() => calculate('multiply')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Division (÷)"
            onPress={() => calculate('divide')}
          />
        </View>

        {/* Animated Result */}
        <Animated.View
          style={{
            transform: [
              {
                scale: resultAnim,
              },
            ],
          }}
        >
          <Text style={styles.result}>
            Result: {result}
          </Text>
        </Animated.View>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#222',
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 18,
  },

  button: {
    marginVertical: 5,
  },

  result: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    color: '#007AFF',
  },
});