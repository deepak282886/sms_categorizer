// src/services/MessageSync.js
export class MessageSync {
    static syncInterval = null;
  
    static startSync(interval = 300000) { // 5 minutes
      this.stopSync(); // Clear any existing interval
      this.syncInterval = setInterval(() => {
        MessageProcessor.syncMessages();
      }, interval);
    }
  
    static stopSync() {
      if (this.syncInterval) {
        clearInterval(this.syncInterval);
        this.syncInterval = null;
      }
    }
  }