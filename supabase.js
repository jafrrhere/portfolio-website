// Supabase Client Setup
import { createClient } from '@supabase/supabase-js';

// Your Supabase configuration
const supabaseUrl = 'https://hdyloqcphgwfyuyvchvi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkeWxvcWNwaGd3Znl1eXZjaHZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1OTk5ODIsImV4cCI6MjA2MTE3NTk4Mn0.hc9XDHufCx0kp6RxPAMin-_XnBwI6CyotKTg1kRMU9M';

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Profile Functions
export async function fetchProfile(userId = 'jafar') {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
}

export async function updateProfile(userId = 'jafar', updates) {
    try {
        const { error } = await supabase
            .from('profiles')
            .upsert({ 
                id: userId,
                ...updates,
                updated_at: new Date()
            });
            
        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error updating profile:', error);
        return false;
    }
}

// Image Upload Functions
export async function uploadProfileImage(file, userId = 'jafar') {
    try {
        if (!file) return null;
        
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;
        const filePath = `profiles/${fileName}`;
        
        // Upload file to Supabase Storage
        const { error: uploadError } = await supabase.storage
            .from('profile-images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: true
            });
            
        if (uploadError) throw uploadError;
        
        // Get public URL
        const { data } = supabase.storage
            .from('profile-images')
            .getPublicUrl(filePath);
            
        // Update profile with new image URL
        await updateProfile(userId, { image_url: data.publicUrl });
        
        return data.publicUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
}

// Projects Functions
export async function fetchProjects(userId = 'jafar') {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

export async function addProject(projectData, userId = 'jafar') {
    try {
        const { data, error } = await supabase
            .from('projects')
            .insert([{
                user_id: userId,
                ...projectData,
                created_at: new Date()
            }]);
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error adding project:', error);
        return null;
    }
}

export async function updateProject(projectId, updates) {
    try {
        const { error } = await supabase
            .from('projects')
            .update(updates)
            .eq('id', projectId);
            
        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error updating project:', error);
        return false;
    }
}

export async function deleteProject(projectId) {
    try {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', projectId);
            
        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error deleting project:', error);
        return false;
    }
}

// User Authentication
export async function signIn(email) {
    try {
        const { error } = await supabase.auth.signInWithOtp({
            email: email
        });
        
        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error sending login link:', error);
        return false;
    }
}

export async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error signing out:', error);
        return false;
    }
}

export async function getCurrentUser() {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session) {
            const { data: { user } } = await supabase.auth.getUser();
            return user;
        }
        
        return null;
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
}

export { supabase }; 