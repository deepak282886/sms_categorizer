//src/components/CategoryCard.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CategoryCard({ category, onPress }) {
  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: category.color }]}
      onPress={onPress}
    >
      <Text style={styles.title}>{category.name}</Text>
      <Text style={styles.count}>{category.messageCount} messages</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  count: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5
  }
});