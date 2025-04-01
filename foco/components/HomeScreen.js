import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [isOn, setIsOn] = React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(isOn ? 1 : 0.3)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isOn ? 1 : 0.3,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isOn]);

  const toggleFocus = () => setIsOn(!isOn);

  return (
    <View style={[styles.container, isOn ? styles.containerLight : styles.containerDark]}>
      <Text style={[styles.title, isOn ? styles.textDark : styles.textLight]}>Control de Iluminación</Text>

      <Text style={[styles.subtitle, isOn ? styles.textDark : styles.textLight]}>
        {isOn ? 'Las luces están ENCENDIDAS' : 'Las luces están APAGADAS'}
      </Text>

      <Animated.Image
        source={isOn ? require('../assets/prendidoF.png') : require('../assets/apagadoF.png')}
        style={[styles.image, { opacity: fadeAnim }]}
      />

      <TouchableOpacity
        style={[styles.button, isOn ? styles.buttonOff : styles.buttonOn]}
        onPress={toggleFocus}
      >
        <Text style={styles.buttonText}>{isOn ? 'Apagar' : 'Encender'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.wifiButton} onPress={() => navigation.navigate('WiFi')}>
        <Text style={styles.buttonText}>Conectar WiFi</Text>
      </TouchableOpacity>

      <Text style={[styles.footer, isOn ? styles.textDark : styles.textLight]}>Diseñado para simplificar tu vida.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  containerLight: {
    backgroundColor: '#FAF3E0',
  },
  containerDark: {
    backgroundColor: '#2C2C2C',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  textLight: {
    color: '#FFFFFF',
  },
  textDark: {
    color: '#2C2C2C',
  },
  image: {
    width: 250,
    height: 250,
    marginVertical: 20,
    resizeMode: 'contain',
  },
  button: {
    width: 220,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 5,
  },
  buttonOn: {
    backgroundColor: '#D72638',
  },
  buttonOff: {
    backgroundColor: '#FF8800',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  wifiButton: {
    backgroundColor: '#444444',
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    width: 220,
    alignItems: 'center',
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HomeScreen;
