import { WORK_PROJECTS } from '../work-data';
import WorkProjectCard from './WorkProjectCard';

interface WorkProjectGridProps {
  onOpenProject: (id: string) => void;
}

export default function WorkProjectGrid({ onOpenProject }: WorkProjectGridProps) {
  // Sort projects: featured first, then by sortOrder
  const sortedProjects = [...WORK_PROJECTS].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.sortOrder - b.sortOrder;
  });

  return (
    <div className="max-w-7xl mx-auto px-8 md:px-16 pb-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {sortedProjects.map((project, index) => {
          // Asymmetric layout logic: 
          // 1st project (featured) full width, 2nd project 7 cols, 3rd project 5 cols.
          // This creates a more editorial flow rather than a static grid.
          let colSpanClass = "md:col-span-12"; // Default
          if (index % 3 === 1) colSpanClass = "md:col-span-7";
          else if (index % 3 === 2) colSpanClass = "md:col-span-5";

          return (
            <div key={project.id} className={colSpanClass}>
              <WorkProjectCard 
                project={project} 
                onClick={() => onOpenProject(project.id)}
                isFeatured={index === 0}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
