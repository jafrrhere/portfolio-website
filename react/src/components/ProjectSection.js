import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import './ProjectSection.css';

function ProjectSection() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        return;
      }

      if (data) {
        setProjects(data);
      }
    } catch (err) {
      console.error('Error processing projects:', err);
    }
  };

  return (
    <>
      {projects.map((project, index) => (
        <section key={project.id} className={`image-card-section ${index % 2 === 1 ? 'reversed' : ''}`}>
          <div className="image-container">
            <img src={project.image_url} alt={project.title} />
            <div className="image-overlay">
              <span className="image-label">Featured Project</span>
            </div>
          </div>
          <div className="image-description">
            <h2>{project.title}</h2>
            <p className="description-text">{project.description}</p>
            <div className="tech-stack">
              {project.technologies?.map((tech, i) => (
                <span key={i} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="project-actions">
              <button className="action-btn">View Project</button>
              <button className="action-btn secondary">View Process</button>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

export default ProjectSection; 