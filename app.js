// Main application file
import { 
    supabase, 
    fetchProfile, 
    updateProfile, 
    uploadProfileImage,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
    signIn,
    signOut,
    getCurrentUser
} from './supabase.js';

// DOM Elements
const profileImage = document.getElementById('profileImage');
const profileName = document.getElementById('profileName');
const profileRole = document.getElementById('profileRole');
const profileLevel = document.getElementById('profileLevel');
const excuseSkill = document.getElementById('excuseSkill');
const excuseSkillValue = document.getElementById('excuseSkillValue');
const procrastinationSkill = document.getElementById('procrastinationSkill');
const procrastinationSkillValue = document.getElementById('procrastinationSkillValue');
const musicSkill = document.getElementById('musicSkill');
const musicSkillValue = document.getElementById('musicSkillValue');
const activeProjects = document.getElementById('activeProjects');

// Initialize Application
async function initializeApp() {
    // Check if user is logged in
    const user = await getCurrentUser();
    
    // Fetch profile data
    const profile = await fetchProfile(user?.id || 'jafar');
    
    if (profile) {
        updateUIWithProfile(profile);
    }
    
    // Fetch projects
    const projects = await fetchProjects(user?.id || 'jafar');
    if (projects && projects.length > 0) {
        updateUIWithProjects(projects);
    }
    
    // Set up event listeners
    setupEventListeners();
}

// Update UI with profile data
function updateUIWithProfile(profile) {
    if (profile.image_url) {
        profileImage.src = profile.image_url;
    }
    
    profileName.textContent = profile.name || 'Jafar Tamboli';
    profileRole.textContent = profile.role || 'PROFESSIONAL EXCUSE-MAKER';
    profileLevel.textContent = `LVL ${profile.level || '27'}`;
    
    if (profile.skills) {
        if (profile.skills.excuse) {
            excuseSkill.style.width = `${profile.skills.excuse}%`;
            excuseSkillValue.textContent = `${profile.skills.excuse}%`;
        }
        
        if (profile.skills.procrastination) {
            procrastinationSkill.style.width = `${profile.skills.procrastination}%`;
            procrastinationSkillValue.textContent = `${profile.skills.procrastination}%`;
        }
        
        if (profile.skills.music) {
            musicSkill.style.width = `${profile.skills.music}%`;
            musicSkillValue.textContent = `${profile.skills.music}%`;
        }
    }
    
    if (profile.projects) {
        activeProjects.innerHTML = `&#x1F4BB; ${profile.projects}`;
    }
}

// Update UI with projects data
function updateUIWithProjects(projects) {
    // Count active projects
    const activeCount = projects.filter(p => p.status === 'In Progress').length;
    activeProjects.innerHTML = `&#x1F4BB; ACTIVE PROJECTS (${activeCount})`;
    
    // You can create a projects list UI here if needed
}

// Set up event listeners
function setupEventListeners() {
    // Profile image upload
    profileImage.style.cursor = 'pointer';
    profileImage.title = 'Click to upload new profile image';
    
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    profileImage.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = await uploadProfileImage(file);
            
            if (imageUrl) {
                profileImage.src = imageUrl;
            }
        }
    });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Supabase Authentication Listeners
supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
        console.log('User signed in:', session.user);
        initializeApp();
    } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
        // You can handle sign out UI updates here
    }
}); 