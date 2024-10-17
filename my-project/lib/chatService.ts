// lib/chatService.ts

import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  onSnapshot,
  serverTimestamp,
  DocumentData 
} from 'firebase/firestore';

export interface ChatMessage {
  id?: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: any;
  sessionId: string;
  userId: string;
}

export class ChatService {
  private readonly collectionName = 'chats';

  // Add a new message to the chat
  async addMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>) {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...message,
        timestamp: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  }

  // Get all messages for a specific chat session
  async getMessages(sessionId: string) {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('sessionId', '==', sessionId),
        orderBy('timestamp', 'asc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ChatMessage[];
    } catch (error) {
      console.error('Error getting messages:', error);
      throw error;
    }
  }

  // Subscribe to real-time updates for a chat session
  subscribeToMessages(sessionId: string, callback: (messages: ChatMessage[]) => void) {
    const q = query(
      collection(db, this.collectionName),
      where('sessionId', '==', sessionId),
      orderBy('timestamp', 'asc')
    );

    return onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ChatMessage[];
      callback(messages);
    });
  }
}

export const chatService = new ChatService();