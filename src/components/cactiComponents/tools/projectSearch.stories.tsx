import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import projectList from '../resources/comprehensiveProjectList.json';

export const ProjectSearch = (props: any) => {
  const [projects, setProjects] = useState<any[]>([]);

  const searchProjects = (search: string) => {
    if (search.length < 3) return setProjects([]);
    const filteredProjects = projectList.filter((project: any) =>
      project.name.toLowerCase().includes(search.toLowerCase())
    );
    setProjects(filteredProjects);
  };

  return (
    <div className="text-sm text-white/70">
      <div className="flex items-center space-x-2 p-2">
        <div className="text-lg text-white/70"> Project Search </div>
        <input
          className="block w-[30%] rounded-md border border-gray-300 bg-white/10 p-2.5 "
          onChange={(e) => searchProjects(e.target.value)}
        />
      </div>

      <div>
        {projects.map((project) => (
          <div className="flex items-center space-x-2 p-2" key={project.id}>
            <strong> {project.name} </strong>- {project.description}
          </div>
        ))}
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'cacti/tools/🔍 Project Search',
  component: ProjectSearch,
};

export default meta;
