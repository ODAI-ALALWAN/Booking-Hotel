
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://ttchtxjdrpyecnfmstjb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0Y2h0eGpkcnB5ZWNuZm1zdGpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzNDgwNDQsImV4cCI6MjAxNDkyNDA0NH0.rRuEae1kVjgEKShlFxNVxeqQHgph2rlx5Onpd7sLG30'
const supabase = createClient(supabaseUrl, supabaseKey)





export default supabase