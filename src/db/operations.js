// src/db/operations.js
import { getRealm } from './realm';

// Message Operations
export const MessageDB = {
  async addMessage(messageData) {
    const realm = await getRealm();
    try {
      realm.write(() => {
        realm.create('Message', {
          id: String(Date.now()),
          ...messageData,
          timestamp: new Date(),
          isRead: false
        });
      });
    } finally {
      realm.close();
    }
  },

  async getAllMessages() {
    const realm = await getRealm();
    try {
      return realm.objects('Message').sorted('timestamp', true);
    } finally {
      realm.close();
    }
  },

  async getMessagesByCategory(category) {
    const realm = await getRealm();
    try {
      return realm.objects('Message')
        .filtered('category == $0', category)
        .sorted('timestamp', true);
    } finally {
      realm.close();
    }
  },

  async markAsRead(messageId) {
    const realm = await getRealm();
    try {
      realm.write(() => {
        const message = realm.objectForPrimaryKey('Message', messageId);
        if (message) {
          message.isRead = true;
        }
      });
    } finally {
      realm.close();
    }
  },

  async deleteMessage(messageId) {
    const realm = await getRealm();
    try {
      realm.write(() => {
        const message = realm.objectForPrimaryKey('Message', messageId);
        if (message) {
          realm.delete(message);
        }
      });
    } finally {
      realm.close();
    }
  },

  async getUnreadMessages() {
    const realm = await getRealm();
    try {
      return realm.objects('Message')
        .filtered('isRead == false')
        .sorted('timestamp', true);
    } finally {
      realm.close();
    }
  }
};

// Category Operations
export const CategoryDB = {
  async initializeDefaultCategories() {
    const defaultCategories = [
      { id: '1', name: 'Personal', color: '#FF6B6B', messageCount: 0 },
      { id: '2', name: 'Work', color: '#4ECDC4', messageCount: 0 },
      { id: '3', name: 'Financial', color: '#45B7D1', messageCount: 0 },
      { id: '4', name: 'Promotional', color: '#96CEB4', messageCount: 0 }
    ];

    const realm = await getRealm();
    try {
      realm.write(() => {
        defaultCategories.forEach(category => {
          realm.create('Category', category, 'modified');
        });
      });
    } finally {
      realm.close();
    }
  },

  async getAllCategories() {
    const realm = await getRealm();
    try {
      return realm.objects('Category').sorted('name');
    } finally {
      realm.close();
    }
  },

  async addCategory(categoryData) {
    const realm = await getRealm();
    try {
      realm.write(() => {
        realm.create('Category', {
          id: String(Date.now()),
          messageCount: 0,
          ...categoryData
        });
      });
    } finally {
      realm.close();
    }
  },

  async updateCategory(categoryId, updates) {
    const realm = await getRealm();
    try {
      realm.write(() => {
        const category = realm.objectForPrimaryKey('Category', categoryId);
        if (category) {
          Object.assign(category, updates);
        }
      });
    } finally {
      realm.close();
    }
  },

  async deleteCategory(categoryId) {
    const realm = await getRealm();
    try {
      realm.write(() => {
        const category = realm.objectForPrimaryKey('Category', categoryId);
        if (category) {
          // Move messages to uncategorized
          const messages = realm.objects('Message')
            .filtered('category == $0', categoryId);
          messages.forEach(message => {
            message.category = 'uncategorized';
          });
          realm.delete(category);
        }
      });
    } finally {
      realm.close();
    }
  },

  async incrementMessageCount(categoryId) {
    const realm = await getRealm();
    try {
      realm.write(() => {
        const category = realm.objectForPrimaryKey('Category', categoryId);
        if (category) {
          category.messageCount += 1;
        }
      });
    } finally {
      realm.close();
    }
  }
};

// Analytics Operations
export const AnalyticsDB = {
  async getMessageStats() {
    const realm = await getRealm();
    try {
      const messages = realm.objects('Message');
      return {
        total: messages.length,
        unread: messages.filtered('isRead == false').length,
        categorized: messages.filtered('category != "uncategorized"').length
      };
    } finally {
      realm.close();
    }
  },

  async getCategoryDistribution() {
    const realm = await getRealm();
    try {
      const categories = realm.objects('Category');
      return categories.map(cat => ({
        name: cat.name,
        count: cat.messageCount
      }));
    } finally {
      realm.close();
    }
  }
};

// Export a function to initialize the database
export async function initializeDatabase() {
  try {
    await getRealm();
    await CategoryDB.initializeDefaultCategories();
    return true;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    return false;
  }
}