import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const WifiScreen = () => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');

  const connectToWifi = async () => {
    if (ssid && password) {
      try {
        // Aquí envías los datos al ESP32 usando fetch
        const response = await fetch('http://<ESP32-IP>/connect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ssid, password }),
        });

        const result = await response.json();

        if (result.success) {
          Alert.alert('Conexión exitosa', 'El ESP32 se ha conectado a la red WiFi');
        } else {
          Alert.alert('Error', 'No se pudo conectar al WiFi');
        }
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al conectar al ESP32');
      }
    } else {
      Alert.alert('Error', 'Por favor ingresa las credenciales');
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
  }
});

export default WifiScreen;
