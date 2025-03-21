import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useFocus } from '../context/FocusContext';  // Ruta actualizada

const HomeScreen = ({ navigation }) => {
  const { isOn, toggleFocus } = useFocus();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control del Foco</Text>
      
      <Image
        source={isOn ? require('../assets/light_on.png') : require('../assets/light_off.png')}
        style={styles.image}
      />
      
      <Button title={isOn ? 'Apagar' : 'Encender'} onPress={toggleFocus} />

      <Button
        title="Conectar WiFi"
        onPress={() => navigation.navigate('WiFi')}
        color="#007BFF"
      />
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
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  }
});

export default HomeScreen;
