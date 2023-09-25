'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import styles from './support.module.css';

export default async function Support() {
  const supabase = createClientComponentClient()
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  if (session) {
   //this is a protected route - only users who are signed in can view this route
    redirect('/');
  }
  
  return (
    <div className={styles.wrapper}>
      <h1 className="text-xl">Support</h1>
    </div>
  );
}
