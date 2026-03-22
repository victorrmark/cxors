import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { originalUrl, customPath, urlTitle } = await req.json();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  let shortPath = customPath || nanoid(5);

  try {
    // for custom paths, we attempt once.
    if (customPath) {
      const { error } = await supabase.from("urls").insert([
        {
          original_url: originalUrl,
          short_path: shortPath,
          user_id: user.id,
          title: urlTitle,
        },
      ]);

      if (error) {
        if (error.code === "23505") {
          // we return an error if the custom path is taken.
          return NextResponse.json(
            { message: "Custom path already in use" },
            { status: 400 }
          );
        }
        return NextResponse.json({ message: error.message }, { status: 400 });
      }
    } else {
      // For auto-generated paths, we loop until we find a unique one.
      let success = false;

      while (!success) {
        const generated = nanoid(5);

        const { error } = await supabase.from("urls").insert([
          {
            original_url: originalUrl,
            short_path: generated,
            user_id: user.id,
            title: urlTitle,
          },
        ]);

        if (!error) {
          shortPath = generated;
          success = true;
        } else if (error.code === "23505") {
          // auto-generated path collision, we try again with a new one.
          continue;
        } else {
          return NextResponse.json(
            { message: error.message },
            { status: 400 }
          );
        }
      }
    }

    const shortUrl = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/${shortPath}`;

    return NextResponse.json({ shortUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}