import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(import.meta.env.REACT_APP_SUPABASE_URL, import.meta.env.REACT_APP_SUPABASE_ANON_KEY)