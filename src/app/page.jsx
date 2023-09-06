'use client';
import styles from './page.module.css';
// import RegistrationForm from '../../components/registration-form';
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function signUp() {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: 'Jaaakeeen@gmail.com',
      password: 'yeah222',
    });

    if (error) {
      console.error('Error signing up:', error.message);
      // Handle the error, e.g., show an error message to the user
    } else {
      // User signed up successfully
      console.log('User signed up successfully:', data);
      // Redirect the user or perform other actions as needed
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    // Handle unexpected errors
  }
}

async function signInWithEmail() {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'Jaaakeeen@gmail.com',
      password: 'yeah222',
    });

    if (error) {
      console.error('Error signing in:', error.message);
      // Handle the error, e.g., show an error message to the user
    } else {
      // User signed up successfully
      console.log('User signed in successfully:', data);
      // Redirect the user or perform other actions as needed
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    // Handle unexpected errors
  }
}

async function logOut() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error.message);
      // Handle the error, e.g., show an error message to the user
    } else {
      // User signed up successfully
      console.log('User signed out successfully:');
      // Redirect the user or perform other actions as needed
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    // Handle unexpected errors
  }
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>MEDIAWATCH</h1>
        {/* <RegistrationForm></RegistrationForm> */}
        <div>
          <button onClick={signUp}>SIGNUP</button>
          <button onClick={signInWithEmail}>SIGNIN</button>
          <button onClick={logOut}>SIGN OUT</button>
        </div>
      </div>
    </main>
  );
}
