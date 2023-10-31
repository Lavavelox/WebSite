import { createClient } from '@supabase/supabase-js'

const supabase_url = 'https://htafomtodyyrchxkcygw.supabase.co'
const anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0YWZvbXRvZHl5cmNoeGtjeWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxNDUwMjIsImV4cCI6MjAxMjcyMTAyMn0.eYvtc6c4RMRd-I6OFeS9pnibzx32pz4oWbLgfrrC-pQ'

export const supabase = createClient(supabase_url, anon_key)