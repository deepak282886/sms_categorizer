//src/components/MessageCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MessageCard({ message }) {
  return (
    <View style={styles.card}>
      <Text style={styles.sender}>{message.sender}</Text>
      <Text style={styles.content}>{message.content}</Text>
      <Text style={styles.timestamp}>
        {new Date(message.timestamp).toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  sender: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  content: {
    fontSize: 14,
    marginTop: 5,
    color: '#333'
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 5
  }
});