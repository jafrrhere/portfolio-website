# Portfolio Website with Supabase Backend

This project uses Supabase for backend storage and authentication.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in
2. Create a new project
3. Note your project URL and anon key from the API settings

### 2. Database Setup

Run the SQL commands from `supabase-setup.sql` in the Supabase SQL editor to:
- Create required tables (`profiles` and `projects`)
- Set up Row Level Security policies
- Insert sample data

### 3. Storage Setup

1. Go to the Storage section in your Supabase dashboard
2. Create a new bucket called `profile-images`
3. Make it public
4. Add bucket policies:
   - Allow authenticated users to upload files
   - Allow public access to view files

### 4. Update Configuration

In `supabase.js`, replace the placeholder values with your actual Supabase credentials:

```javascript
const supabaseUrl = 'https://hdyloqcphgwfyuyvchvi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkeWxvcWNwaGd3Znl1eXZjaHZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1OTk5ODIsImV4cCI6MjA2MTE3NTk4Mn0.hc9XDHufCx0kp6RxPAMin-_XnBwI6CyotKTg1kRMU9M';
```

### 5. Authentication (Optional)

If you want to use authentication:
1. Enable email auth provider in Supabase Authentication settings
2. Configure site URL and redirect URLs

## File Structure

- `index.html` - Main HTML file with UI structure
- `supabase.js` - Supabase client and helper functions
- `app.js` - Main application logic
- `supabase-setup.sql` - SQL commands for database setup

## Features

- Profile data storage
- Profile image uploads
- Projects management
- Skills tracking
- Authentication (optional)

## Database Schema

### Profiles Table
- `id` - Primary key (user ID)
- `name` - User's name
- `role` - User's role
- `level` - User's level
- `image_url` - URL to profile image
- `skills` - JSON object with skill scores
- `projects` - Text description of active projects
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Projects Table
- `id` - Primary key (UUID)
- `user_id` - Foreign key to profiles
- `title` - Project title
- `description` - Project description
- `status` - Project status
- `priority` - Project priority
- `deadline` - Project deadline
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp 