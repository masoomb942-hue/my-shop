/* NOVARA Supabase connection.
   Replace both placeholders with your Supabase Project URL and anon/public key.
   NEVER put a service_role/secret key in website files. */
window.NOVARA_SUPABASE_URL = 'https://itellliibtxbaqmmmsyy.supabase.co';
window.NOVARA_SUPABASE_ANON_KEY = 'sb_publishable_x-36KvPyZcI0OhZYCEfpLg_lyS_68Rp';
window.novaraSupabaseReady = () =>
  window.NOVARA_SUPABASE_URL.startsWith('https://') &&
  !window.NOVARA_SUPABASE_ANON_KEY.includes('PASTE_');
window.novaraDb = () => window.novaraSupabaseReady()
  ? window.supabase.createClient(window.NOVARA_SUPABASE_URL, window.NOVARA_SUPABASE_ANON_KEY)
  : null;
