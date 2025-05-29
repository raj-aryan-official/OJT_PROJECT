import { io } from 'socket.io-client';
import { getToken } from './auth';

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect() {
    if (this.socket?.connected) return;

    const token = getToken();
    if (!token) return;

    this.socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    this.setupEventListeners();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  setupEventListeners() {
    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    // Handle reconnection
    this.socket.on('reconnect_attempt', (attemptNumber) => {
      console.log(`Reconnection attempt ${attemptNumber}`);
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log(`Reconnected after ${attemptNumber} attempts`);
    });

    this.socket.on('reconnect_error', (error) => {
      console.error('Reconnection error:', error);
    });

    this.socket.on('reconnect_failed', () => {
      console.error('Failed to reconnect');
    });
  }

  // Subscribe to notifications
  subscribeToNotifications(callback) {
    if (!this.socket) return;

    this.socket.on('notification', callback);
    this.listeners.set('notification', callback);
  }

  // Subscribe to shop notifications
  subscribeToShopNotifications(callback) {
    if (!this.socket) return;

    this.socket.on('shop_notification', callback);
    this.listeners.set('shop_notification', callback);
  }

  // Subscribe to order updates
  subscribeToOrderUpdates(orderId, callback) {
    if (!this.socket) return;

    this.socket.emit('join_order', orderId);
    this.socket.on(`order_update_${orderId}`, callback);
    this.listeners.set(`order_update_${orderId}`, callback);
  }

  // Subscribe to cart updates
  subscribeToCartUpdates(callback) {
    if (!this.socket) return;

    this.socket.on('cart_update', callback);
    this.listeners.set('cart_update', callback);
  }

  // Unsubscribe from notifications
  unsubscribeFromNotifications() {
    if (!this.socket) return;

    const callback = this.listeners.get('notification');
    if (callback) {
      this.socket.off('notification', callback);
      this.listeners.delete('notification');
    }
  }

  // Unsubscribe from shop notifications
  unsubscribeFromShopNotifications() {
    if (!this.socket) return;

    const callback = this.listeners.get('shop_notification');
    if (callback) {
      this.socket.off('shop_notification', callback);
      this.listeners.delete('shop_notification');
    }
  }

  // Unsubscribe from order updates
  unsubscribeFromOrderUpdates(orderId) {
    if (!this.socket) return;

    const callback = this.listeners.get(`order_update_${orderId}`);
    if (callback) {
      this.socket.emit('leave_order', orderId);
      this.socket.off(`order_update_${orderId}`, callback);
      this.listeners.delete(`order_update_${orderId}`);
    }
  }

  // Unsubscribe from cart updates
  unsubscribeFromCartUpdates() {
    if (!this.socket) return;

    const callback = this.listeners.get('cart_update');
    if (callback) {
      this.socket.off('cart_update', callback);
      this.listeners.delete('cart_update');
    }
  }

  // Emit custom event
  emit(event, data) {
    if (!this.socket) return;
    this.socket.emit(event, data);
  }
}

export const socketService = new SocketService();
export default socketService; 