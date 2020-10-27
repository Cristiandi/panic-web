import EventBus from '@/event-bus.js';

class Message {
    constructor() {
        this.type = '';
        this.message = '';
    }

    addMessageSuccess(message) {
      this.type = 'Success';
      this.message = message;
      this.event(this.type, this.message);
    }
  
    addMessageWarning(message) {
      this.type = 'Warning';
      this.message = message;
      this.event(this.type, this.message);
    }
  
    addMessageError(message) {
      this.type = 'Error';
      this.message = message;
      this.event(this.type, this.message);
    }
  
    addMessageInfo(message) {
      this.type = 'Info';
      this.message = message;
      this.event(this.type, this.message);
    }
  
    event(type, message) {
      EventBus.$emit('time-limit', { type, message });
    }
  }
  export default new Message();