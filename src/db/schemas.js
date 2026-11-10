export const MessageSchema = {
  name: 'Message',
  properties: {
    id: 'string',
    sender: 'string',
    content: 'string',
    timestamp: 'date',
    category: 'string',
    isRead: 'bool'
  },
  primaryKey: 'id'
};

export const CategorySchema = {
  name: 'Category',
  properties: {
    id: 'string',
    name: 'string',
    color: 'string',
    messageCount: 'int'
  }
};