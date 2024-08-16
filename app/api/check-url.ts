import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { url } = req.query;

    if (typeof url !== 'string') {
      return res.status(400).json({ message: 'Invalid URL parameter.' });
    }

    try {
      const { data, error } = await supabase
        .from('shortened_urls')
        .select('id')
        .eq('original_url', url)
        .single();

      if (error) {
        console.error('Error checking URL existence:', error);
        return res.status(500).json({ message: 'Internal server error.' });
      }

      return res.status(200).json({ exists: !!data });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
