// Import the necessary Firebase functions
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, query, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgPrh4MI2L3aBwEgJN27YYqXEZ8J6NMSE",
  authDomain: "realtime-chat-bbb30.firebaseapp.com",
  projectId: "realtime-chat-bbb30",
  storageBucket: "realtime-chat-bbb30.firebasestorage.app",
  messagingSenderId: "788488500012",
  appId: "1:788488500012:web:f52692f9fed0be2468f289",
  measurementId: "G-B9FF6W132M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

function FirebaseConfig() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Realtime Chat</h1>
      </header>
      <section>{user ? <ChatRoom user={user} /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User signed in:", result.user);
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };

  return (
    <div>
      <h2>Please Sign In</h2>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

function SignOut() {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully.");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <button onClick={handleSignOut} style={{ marginTop: "20px" }}>
      Sign Out
    </button>
  );
}

function ChatRoom({ user }) {
  const messagesRef = collection(firestore, "messages");
  const q = query(messagesRef, orderBy("createdAt", "asc"));
  const [messages] = useCollectionData(q, { idField: "id" });

  return (
    <div>
      <h2>Welcome to the Chat Room, {user.displayName || "User"}!</h2>
      <div>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </div>
      <SignOut />
    </div>
  );
}

function ChatMessage(props) {
  const { text,uid } = props.message;

  return <p>{text}</p>;
}

export default FirebaseConfig;
