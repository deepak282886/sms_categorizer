//src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { CategoryDB } from '../db';
import CategoryCard from '../components/CategoryCard';

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await CategoryDB.getAllCategories();
    setCategories(Array.from(data));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onPress={() => navigation.navigate('Category', { categoryId: item.id })}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  }
});