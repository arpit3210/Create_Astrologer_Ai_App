'use client'
import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection } from 'firebase/firestore';
import { Button } from "@/components/ui/button";
import { 
  Heart,
  Star,
  ThumbsUp,
  Award,
  Gift
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Firebase config
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Define a type for clickCounts
type ClickCounts = {
  heart: number;
  star: number;
  thumbsUp: number;
  award: number;
  gift: number;
  [key: string]: number; // Allow indexing with a string
};

export default function FirebaseUI() {
  const { getToken, userId } = useAuth();
  const [clickCounts, setClickCounts] = useState<ClickCounts>({
    heart: 0,
    star: 0,
    thumbsUp: 0,
    award: 0,
    gift: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      signInAndLoadData();
    }
  }, [userId]);

  const signInAndLoadData = async () => {
    try {
      const token = await getToken({ template: 'integration_firebase' });
      await signInWithCustomToken(auth, token || '');
      await loadUserData();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const loadUserData = async () => {
    if (!userId) return;

    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        setClickCounts(userDoc.data().clickCounts || {
          heart: 0,
          star: 0,
          thumbsUp: 0,
          award: 0,
          gift: 0
        });
      } else {
        // Create new user document if it doesn't exist
        await setDoc(doc(db, 'users', userId), {
          clickCounts: {
            heart: 0,
            star: 0,
            thumbsUp: 0,
            award: 0,
            gift: 0
          }
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = async (buttonType: string) => {
    if (!userId) return;

    const newCounts = {
      ...clickCounts,
      [buttonType]: (clickCounts[buttonType] || 0) + 1
    };

    setClickCounts(newCounts);

    try {
      await updateDoc(doc(db, 'users', userId), {
        [`clickCounts.${buttonType}`]: newCounts[buttonType]
      });
    } catch (error) {
      console.error('Error updating click count:', error);
    }
  };

  if (!userId) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Authentication Required</CardTitle>
          <CardDescription>
            Please sign in with Clerk to access this page.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Interactive Buttons</CardTitle>
        <CardDescription>
          Click the buttons below to track your interactions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => handleButtonClick('heart')}
          >
            <Heart className="w-4 h-4" />
            <span>Hearts: {clickCounts.heart}</span>
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => handleButtonClick('star')}
          >
            <Star className="w-4 h-4" />
            <span>Stars: {clickCounts.star}</span>
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => handleButtonClick('thumbsUp')}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>Likes: {clickCounts.thumbsUp}</span>
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => handleButtonClick('award')}
          >
            <Award className="w-4 h-4" />
            <span>Awards: {clickCounts.award}</span>
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 col-span-2"
            onClick={() => handleButtonClick('gift')}
          >
            <Gift className="w-4 h-4" />
            <span>Gifts: {clickCounts.gift}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
