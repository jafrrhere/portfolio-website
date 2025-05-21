import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hdyloqcphgwfyuyvchvi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkeWxvcWNwaGd3Znl1eXZjaHZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1OTk5ODIsImV4cCI6MjA2MTE3NTk4Mn0.hc9XDHufCx0kp6RxPAMin-_XnBwI6CyotKTg1kRMU9M';

export const supabase = createClient(supabaseUrl, supabaseKey); 