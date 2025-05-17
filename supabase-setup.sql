-- Create profiles table
CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" VARCHAR PRIMARY KEY,
    "name" VARCHAR,
    "role" VARCHAR,
    "level" INTEGER,
    "image_url" VARCHAR,
    "skills" JSONB,
    "projects" VARCHAR,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE IF NOT EXISTS "public"."projects" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "user_id" VARCHAR REFERENCES "public"."profiles"("id"),
    "title" VARCHAR NOT NULL,
    "description" TEXT,
    "status" VARCHAR,
    "priority" INTEGER,
    "deadline" TIMESTAMP WITH TIME ZONE,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS)
ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."projects" ENABLE ROW LEVEL SECURITY;

-- Create storage bucket for profile images
-- Note: In Supabase, create this through the web UI: Storage -> New Bucket -> Name: "profile-images" -> Make public

-- Row Level Security Policies

-- Profiles table policies
CREATE POLICY "Public profiles are viewable by everyone." 
ON "public"."profiles" FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile." 
ON "public"."profiles" FOR UPDATE 
USING (auth.uid()::text = id);

CREATE POLICY "Users can insert their own profile." 
ON "public"."profiles" FOR INSERT 
WITH CHECK (auth.uid()::text = id);

-- Projects table policies
CREATE POLICY "Projects are viewable by owner." 
ON "public"."projects" FOR SELECT 
USING (auth.uid()::text = user_id);

CREATE POLICY "Projects are insertable by owner." 
ON "public"."projects" FOR INSERT 
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Projects are updatable by owner." 
ON "public"."projects" FOR UPDATE 
USING (auth.uid()::text = user_id);

CREATE POLICY "Projects are deletable by owner." 
ON "public"."projects" FOR DELETE 
USING (auth.uid()::text = user_id);

-- Storage policies (needs to be set up in the Supabase dashboard)
-- For profile-images bucket:
-- 1. Enable policy for uploads (authenticated users can upload)
-- 2. Enable policy for downloads (public access to view images)

-- Sample data insertion

-- Insert a sample profile
INSERT INTO "public"."profiles" (id, name, role, level, skills, projects)
VALUES (
    'jafar', 
    'Jafar Tamboli', 
    'PROFESSIONAL EXCUSE-MAKER', 
    27, 
    '{"excuse": 98, "procrastination": 95, "music": 82}', 
    'ACTIVE PROJECTS'
)
ON CONFLICT (id) DO NOTHING;

-- Insert sample projects
INSERT INTO "public"."projects" (user_id, title, description, status, priority)
VALUES 
    ('jafar', 'Website Redesign', 'Completely redesign personal portfolio website', 'In Progress', 1),
    ('jafar', 'Music Album', 'Complete tracks for upcoming EP release', 'Planning', 2),
    ('jafar', 'Excuse Generator', 'AI-powered app that generates creative excuses', 'Idea', 3); 