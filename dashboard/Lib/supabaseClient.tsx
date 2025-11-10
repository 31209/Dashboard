import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jhbywcifooqxkxotqhnh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoYnl3Y2lmb29xeGt4b3RxaG5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzODQ5NTUsImV4cCI6MjA3Nzk2MDk1NX0.ERBFQ367HoBfAkiLQZ_Bw38y5PemxVZqYqf6FyugVJE'

export const supabase = createClient(supabaseUrl, supabaseKey)
