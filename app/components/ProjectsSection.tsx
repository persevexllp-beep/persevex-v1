import Image from 'next/image';
import { ProjectsType } from '../constants/courseConstant';

const ProjectCard = ({ name, description, image }: { name: string; description: string; image: string }) => {
    return (
        <div className="relative flex-shrink-0 w-80 h-96 mx-4 rounded-2xl overflow-hidden 
                       bg-white/5 backdrop-blur-sm border border-white/10
                       transition-all duration-500 ease-out
                        hover:shadow-2xl hover:shadow-orange-500/10
                       hover:border-orange-400/30 group
                       whitespace-normal"> {/* <--- FIX: Added this class */}
            
            {/* Image Container */}
            <div className="relative w-full h-48 overflow-hidden">
                <Image 
                    src={image} 
                    alt={name} 
                    fill
                    className="object-cover transition-transform duration-500 
                              group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            </div>
            
            {/* Content Container */}
            <div className="relative p-6 h-48 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-white mb-3 
                                   line-clamp-2 leading-tight">
                        {name}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed 
                                  line-clamp-4">
                        {description}
                    </p>
                </div>
                
                {/* Subtle bottom accent */}
                <div className="flex items-center justify-between mt-4">
                    <div className="h-px bg-gradient-to-r from-orange-400/50 to-transparent flex-1" />
                    <div className="w-2 h-2 bg-orange-400/60 rounded-full ml-3" />
                </div>
            </div>
        </div>
    );
};

// ... (ProjectCard component remains the same)

export default function ProjectsSection({ projects }: { projects: ProjectsType[] | undefined }) {
    if (!projects || projects.length === 0) {
        return null;
    }

    return (
        <section className="py-20 min-h-screen flex flex-col items-center justify-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold text-center 
                           uppercase tracking-wide text-white">
                Hands-On Projects
            </h2>
            <p className='text-center mt-4'>Our Real-Time projects help you gain knowledge and enhance your skills.</p>

            {/* 1. Name the group for the scroller */}
            <div className="group/scroller mt-12 relative w-full overflow-hidden whitespace-nowrap">
                <div className="flex h-96 items-center animate-infinite-scroll 
                                ">
                    {projects.map((project, index) => (
                        <ProjectCard key={`project1-${index}`} {...project} />
                    ))}
                    {projects.map((project, index) => (
                        <ProjectCard key={`project2-${index}`} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
}