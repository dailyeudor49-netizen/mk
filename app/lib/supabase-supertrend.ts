import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ftpujxbcvfhhsivayenv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0cHVqeGJjdmZoaHNpdmF5ZW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMDQ0NzgsImV4cCI6MjA4Mzc4MDQ3OH0.PXedWXHONw7F8e0VrLvPsAaXMD5gdXM4cMQB5Gu-Wcs';

export const supabaseSupertrend = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface LeadData {
  landing_page: string;
  product?: string;
  customer_name?: string;
  phone?: string;
  address?: string;
  price?: number;
  currency?: string;
  network_response?: string;
  network_raw?: Record<string, unknown>;
  utm_source?: string;
  utm_campaign?: string;
}

export async function saveLeadSupertrend(data: LeadData): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabaseSupertrend
      .from('leads')
      .insert([data]);

    if (error) {
      console.error('[Supabase Supertrend] Error saving lead:', error);
      return { success: false, error: error.message };
    }

    console.log('[Supabase Supertrend] Lead saved successfully');
    return { success: true };
  } catch (err) {
    console.error('[Supabase Supertrend] Exception:', err);
    return { success: false, error: String(err) };
  }
}

export async function updateLeadNetworkResponse(
  phone: string,
  landing_page: string,
  network_response: string,
  network_raw: Record<string, unknown>
): Promise<void> {
  try {
    const { error } = await supabaseSupertrend
      .from('leads')
      .update({ network_response, network_raw })
      .eq('phone', phone)
      .eq('landing_page', landing_page)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('[Supabase Supertrend] Error updating lead:', error);
    }
  } catch (err) {
    console.error('[Supabase Supertrend] Update exception:', err);
  }
}
