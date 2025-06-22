import { useState } from 'react';
import {
  doCreateUserWithEmailAndPassoword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from './firebase/auth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async () => {
    try {
      await doSignInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  const handleRegister = async () => {
    try {
      await doCreateUserWithEmailAndPassoword(email, password);
    } catch (err) {
      console.error("Registration failed:", err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await doSignInWithGoogle();
    } catch (err) {
      console.error("Google login failed:", err.message);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleEmailLogin}>Log In</button>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleGoogleLogin}>Log In with Google</button>
    </div>
  );
}