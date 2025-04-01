import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useFocus } from '../context/FocusContext';

const HomeScreen = ({ navigation }) => {
  const { isOn, toggleFocus: toggleFocusContext } = useFocus();
  const esp32IP = 'LA_DIRECCION_IP_DE_TU_ESP32'; // Reemplaza con la IP real

  const toggleFocus = async () => {
    toggleFocusContext(); // Actualiza el estado local de la interfaz

    try {
      const endpoint = isOn ? '/foco/off' : '/foco/on';
      const url = `http://${esp32IP}${endpoint}`;

      const response = await fetch(url, {
        method: 'POST',
      });

      if (!response.ok) {
        console.error('Error al controlar el foco:', response.status);
        // Opcionalmente, podrías revertir el estado local aquí si la petición falla
      } else {
        console.log('Comando enviado al ESP32');
        // Puedes procesar la respuesta si el ESP32 envía algo útil
        const result = await response.json();
        console.log('Respuesta del ESP32:', result);
      }

    } catch (error) {
      console.error('Error de conexión con el ESP32:', error);
      // Muestra un mensaje de error al usuario
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control del Foco</Text>

      <Image
        source={isOn ? require('../assets/light_on.png') : require('../assets/light_off.png')}
        style={styles.image}
      />

      <Button
        title={isOn ? 'Apagar' : 'Encender'}
        onPress={toggleFocus}
        color="#4CAF50" // Un color verde para encender/apagar
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Conectar WiFi"
          onPress={() => navigation.navigate('WiFi')}
          color="#007BFF"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 30,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
  button: {
    marginBottom: 15,
  },
});

export default HomeScreen;