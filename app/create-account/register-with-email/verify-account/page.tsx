import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function VerifyAccount() {
  const handleSubmit = async (formData: FormData) => {
    "use server"
    const firstName = formData.get("firstname");
    const lastName = formData.get("lastname");
    const supabase = createServerActionClient({ cookies });
    await supabase.from("users").insert({ firstName, lastName })
    revalidatePath("/account")
  };

  return (
    <form
      className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      action={handleSubmit}
    >
       <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
    name ="firstname"
          required
        />
       <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
    name ="lastname"
          required
        />
    </form>
  );
}
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { useEffect, useState } from 'react';

// export default async function ClientComponent() {
//   const supabase = createClientComponentClient();
//   const [firstName, setFirstName] = useState<any[]>([]);
//   const [lastName, setLastName] = useState<any[]>([]);

//   useEffect(() => {
//     const getUsers = async () => {
//       const { data } = await supabase.from('users').select(`
//     firstname, lastname)
//   `);

//       // const { data } = await supabase.from('services').select();
//       if (data) {
//         setFirstName(data);
//         setLastName(data);
//         console.log(data);
//       }
//     };

//     getUsers();
//   }, [supabase, setUsers]);

//   return (
//     <>
//       <h1>Verifiera dig</h1>
//       <form
//         className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
//         onSubmit={handleSubmit}
//       >
//         <label className="text-md" htmlFor="text">
//           Förnamn*
//         </label>
//         <input
//           className="rounded-md px-4 py-2 bg-inherit border mb-6"
//           value={firstname}
//           onChange={(e) => setFirstname(e.target.value)}
//           placeholder="Förnamn"
//           required
//         />
//         <label className="text-md" htmlFor="text">
//           Efternamn*
//         </label>
//         <input
//           className="rounded-md px-4 py-2 bg-inherit border mb-6"
//           type="text"
//           value={lastname}
//           onChange={(e) => setLastname(e.target.value)}
//           placeholder="Efternamn"
//           required
//         />
//         <div>
//           <input
//             type="checkbox"
//             id="verify-human"
//             name="verify-human"
//             required
//           />
//           <label htmlFor="verify-human">Jag är ingen robot</label>
//         </div>

//         <div>
//           <input type="checkbox" id="conditions" name="conditions" required />
//           <label htmlFor="conditions">
//             <Link className="underline " href="/conditions">
//               Användarvillkor
//             </Link>
//           </label>
//         </div>

//         <button
//           type="submit"
//           className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
//         >
//           Kom igång
//         </button>
//       </form>
//     </>
//   );
// }
