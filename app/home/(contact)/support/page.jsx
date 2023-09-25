'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import styles from './support.module.css';

export default async function Support() {

  const supabase = createClientComponentClient()
  
  return (
    <div className={styles.wrapper}>
      <h1 className="text-xl">Support</h1>
    </div>
  );
}
