import styles from './page.module.css';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabase_url, anon_key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

export default function Registration() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>REGISTRATION</div>
    </main>
  );
}
