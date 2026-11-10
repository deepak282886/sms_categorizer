//src/screens/CategoryScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { MessageDB } from '../db';
import MessageList from '../components/MessageList';

export default function CategoryScreen({ route }) {
  const { categoryId } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages();
  }, [categoryId]);

  const loadMessages = async () => {
    const data = await MessageDB.getMessagesByCategory(categoryId);
    setMessages(Array.from(data));
  };

  return (
    <View style={styles.container}>
      <MessageList messages={messages} onRefresh={loadMessages} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});