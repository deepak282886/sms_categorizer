//src/components/MessageList.js
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import MessageCard from './MessageCard';

export default function MessageList({ messages, onRefresh }) {
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <MessageCard message={item} />}
      keyExtractor={item => item.id}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
    />
  );
}