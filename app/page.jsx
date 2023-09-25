import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function ServerComponent() {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/startpage');
  }

  return (
    <>
      <div className="welcomePage">
        <h1>
          Välkommen till <br /> Media Watch!
        </h1>
        <div className="welcomeAnimation"></div>
      </div>
    </>
  );
}

// 'use client';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { redirect } from 'next/navigation';

// export default async function Index() {
//   const supabase = createClientComponentClient();
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   // if (session) {
//   //   //this is a protected route - only users who are signed in can view this route
//   //   redirect('/');
//   // } else {
//   //   // Redirect to /home after 5 seconds
//   //   setTimeout(() => {
//   //     console.log('hejsan');
//   //     redirect('/home');
//   //   }, 5000);
//   // }

//   return (
//     <>
//       <div className="welcomePage">
//         <h1>
//           Välkommen till <br /> Media Watch!
//         </h1>
//         <div className="welcomeAnimation"></div>
//       </div>
//     </>
//   );
// }
