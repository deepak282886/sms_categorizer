// src/services/MessageProcessor.js
import { MessageDB, CategoryDB } from '../db';
import { PermissionsAndroid } from 'react-native';
import SMS from 'react-native-sms';

export class MessageProcessor {
  static async requestPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: "SMS Permission",
          message: "App needs access to read your SMS",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Permission error:', error);
      return false;
    }
  }

  static categorizeMessage(message) {
    const patterns = {
      financial: /(bank|transaction|credit|debit|payment|upi|balance|account)/i,
      work: /(meeting|project|deadline|report|office|urgent|reminder)/i,
      personal: /(hey|hi|hello|dinner|lunch|call me|meet|family)/i,
      promotional: /(offer|discount|sale|win|congratulations|off|limited|deal)/i
    };

    for (const [category, pattern] of Object.entries(patterns)) {
      if (pattern.test(message.content)) {
        return category;
      }
    }
    return 'uncategorized';
  }

  static async processMessage(message) {
    try {
      const category = this.categorizeMessage(message);
      await MessageDB.addMessage({
        ...message,
        category
      });
      await CategoryDB.incrementMessageCount(category);
      return true;
    } catch (error) {
      console.error('Process message error:', error);
      return false;
    }
  }

  static async processBulkMessages(messages) {
    const results = await Promise.all(
      messages.map(msg => this.processMessage(msg))
    );
    return results.every(result => result === true);
  }

  static async fetchLatestMessages() {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) return [];

      return new Promise((resolve) => {
        SMS.list(
          JSON.stringify({
            box: 'inbox',
            indexFrom: 0,
            maxCount: 50,
          }),
          (fail) => {
            console.log('Failed to fetch messages:', fail);
            resolve([]);
          },
          (count, smsList) => {
            const messages = JSON.parse(smsList).map(sms => ({
              id: String(sms._id),
              sender: sms.address,
              content: sms.body,
              timestamp: new Date(sms.date)
            }));
            resolve(messages);
          },
        );
      });
    } catch (error) {
      console.error('Fetch messages error:', error);
      return [];
    }
  }

  static async syncMessages() {
    try {
      const messages = await this.fetchLatestMessages();
      if (messages.length === 0) return false;
      
      return await this.processBulkMessages(messages);
    } catch (error) {
      console.error('Sync error:', error);
      return false;
    }
  }
}