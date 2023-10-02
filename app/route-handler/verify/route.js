// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// export const dynamic = 'force-dynamic';

export async function POST(request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const firstName = String(formData.get("firstname"));
  const lastName = String(formData.get("lastname"));
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;
  await supabase
    .from("users")
    .insert({ user_id: userId, firstname: firstName, lastname: lastName });

  return NextResponse.redirect(
    `${requestUrl.origin}/create-account/get-started`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  );
}
