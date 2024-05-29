import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eoigrvfqdixpgpewqysu.supabase.co'
const supabaseKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvaWdydmZxZGl4cGdwZXdxeXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzODIyNjUsImV4cCI6MjAzMTk1ODI2NX0._l193FGq1yO7SAqgMHHwkYgrgG_ix-DuwQ-WBfCSeuY'   

export const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase