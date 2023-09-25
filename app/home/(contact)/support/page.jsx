'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import styles from './support.module.css';

export const dynamic = 'force-dynamic'

export default function Support() {

  const supabase = createClientComponentClient()
  
  return (
    <div className={styles.wrapper}>
      <h1 className="text-xl">Support</h1>
    </div>
  );
}
