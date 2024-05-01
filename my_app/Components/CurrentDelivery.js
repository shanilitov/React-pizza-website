import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CurrentDelivery = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log('Navigate to Home')} style={styles.goBack}>
        <Text style={styles.icon}>⬅️</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.status}>Ready to pick</Text>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Picked Up')}>
          <Text style={styles.buttonText}>Picked Up?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => console.log('Navigate to Chat')} style={styles.chatIcon}>
        <Text style={styles.icon}>💬</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBack: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  chatIcon: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 1,
  },
  icon: {
    fontSize: 24,
    color: '#000',
  },
  content: {
    alignItems: 'center',
  },
  status: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
  },
  button: {
    backgroundColor: '#FF6347',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CurrentDelivery;
