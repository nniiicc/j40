import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type DbColorEntry = {
  id: number;
  submitter: string;
  color_hex: string;
  color_name: string;
  year_met: string;
  message: string;
  photo_url: string;
  created_at: string;
};
