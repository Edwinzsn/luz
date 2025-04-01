import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const WifiScreen = () => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [ipAddress, setIpAddress] = useState('');

  const connectToWifi = async () => {
    if (!ssid || !password) {
      Alert.alert('Error', 'Por favor ingresa las credenciales');
      return;
    }

    try {
      const response = await fetch('http://192.168.4.1/wifi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ssid, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setIpAddress(data.message);
        Alert.alert('Conectado', `Respuesta del ESP32: ${data.message}`);
      } else {
        Alert.alert('Error', 'No se pudo conectar al ESP32');
      }
    } catch (error) {
      Alert.alert('Error', `Error de conexión: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conectar al WiFi</Text>

      <TextInput
        style={styles.input}
        placeholder="SSID"
        value={ssid}
        onChangeText={setSsid}
        placeholderTextColor="#B0B0B0"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#B0B0B0"
      />

      <TouchableOpacity style={styles.button} onPress={connectToWifi}>
        <Text style={styles.buttonText}>Conectar</Text>
      </TouchableOpacity>

      {ipAddress ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Conectado exitosamente</Text>
          <Text style={styles.resultText}>IP del ESP32: {ipAddress}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '85%',
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#444444',
    color: '#FFFFFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#D72638',
    padding: 16,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#555555',
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  resultText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default WifiScreen;
