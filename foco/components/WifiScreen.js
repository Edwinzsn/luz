import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

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
      const response = await fetch('http://192.168.4.1/wifi', {  // Cambia la IP al del ESP32
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ssid, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setIpAddress(data.message);  // Muestra el mensaje con la IP del ESP32
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
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Conectar" onPress={connectToWifi} />

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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 16,
  },
});

export default WifiScreen;
