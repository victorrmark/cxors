import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../utils/supabase/server'; // Adjust the path to your server.ts file
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { originalUrl, customPath, urlTitle } = await req.json();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const shortPath = customPath || nanoid(8);

  try {
    const { data, error } = await supabase
      .from('urls')
      .insert([{ original_url: originalUrl, short_path: shortPath, user_id: user.id, title: urlTitle }]);

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const shortUrl = `${process.env.BASE_URL}/${shortPath}`;

    return NextResponse.json({ shortUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
