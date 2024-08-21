import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server"; // Adjust the path to your server.ts file
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { originalUrl, customPath, urlTitle } = await req.json();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const shortPath = customPath || nanoid(8);

  try {
    const { data, error } = await supabase.from("urls").insert([
      {
        original_url: originalUrl,
        short_path: shortPath,
        user_id: user.id,
        title: urlTitle,
      },
    ]);

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${shortPath}`;
    console.log(shortUrl)

    return NextResponse.json({ shortUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// export async function GET(req: NextRequest) {
//   const supabase = createClient();
//   const { searchParams } = new URL(req.url);
//   const shortPath = req.nextUrl.pathname.split("/").pop(); // Extract shortPath from the URL

//   console.log("Extracted Short Path:", shortPath); // Log the extracted shortPath

//   if (!shortPath) {
//     return NextResponse.json({ message: "Invalid URL" }, { status: 400 });
//   }

//   try {
//     const { data, error } = await supabase
//       .from("urls")
//       .select("original_url")
//       .eq("short_path", shortPath)
//       .single();

//     if (error || !data) {
//       console.log("Supabase Error or No Data:", error, data); // Log any errors or missing data
//       return NextResponse.json({ message: "URL not found" }, { status: 404 });
//     }

//     const { original_url: originalUrl } = data;

//     console.log("Redirecting to:", originalUrl); // Log the URL to which the redirect will occur

//     return NextResponse.redirect(originalUrl, 302);
//   } catch (error) {
//     console.log("Internal Server Error:", error); // Log any internal server errors
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
