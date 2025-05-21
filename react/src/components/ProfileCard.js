import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import './ProfileCard.css';

function ProfileCard() {
  const [profileData, setProfileData] = useState({
    name: 'Jafar Tamboli',
    role: 'PROFESSIONAL EXCUSE-MAKER',
    level: '27',
    skills: {
      excuse: 98,
      procrastination: 95,
      music: 82
    },
    image_url: 'https://hdyloqcphgwfyuyvchvi.supabase.co/storage/v1/object/public/project-images//Profile%20pic.jpg'
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', 'jafar')
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfileData(data);
      }
    } catch (err) {
      console.error('Error processing profile data:', err);
    }
  };

  return (
    <div className="profile-card">
      <div><span className="security">Profile</span> <span className="id">person!!</span></div>
      <img className="profile-img" src={profileData.image_url} alt="Profile" />
      <div className="name">{profileData.name}</div>
      <div className="role">{profileData.role}</div>
      <div className="badges">
        <span className="badge">LVL {profileData.level}</span>
        <span className="badge verified">VERIFIED</span>
      </div>
      <div className="skills">
        <div className="skill-row">
          <span className="skill-label">Excuse Making</span>
          <div className="skill-bar excuse">
            <div className="skill-bar-inner" style={{ width: `${profileData.skills.excuse}%` }}></div>
          </div>
          <span>{profileData.skills.excuse}%</span>
        </div>
        <div className="skill-row">
          <span className="skill-label">Procrastination</span>
          <div className="skill-bar procrastination">
            <div className="skill-bar-inner" style={{ width: `${profileData.skills.procrastination}%` }}></div>
          </div>
          <span>{profileData.skills.procrastination}%</span>
        </div>
        <div className="skill-row">
          <span className="skill-label">Music Production</span>
          <div className="skill-bar music">
            <div className="skill-bar-inner" style={{ width: `${profileData.skills.music}%` }}></div>
          </div>
          <span>{profileData.skills.music}%</span>
        </div>
      </div>
      <div className="active-projects">&#x1F4BB; ACTIVE PROJECTS</div>
    </div>
  );
}

export default ProfileCard; 