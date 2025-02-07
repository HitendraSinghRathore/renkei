
import Image from "next/image";
import ProjectCard from "../ProjectCard";
import { Skeleton } from "../ui/skeleton";
import PaginationNav from "./PaginationNav";

export default function DashboardPage({projects, isLoading, onUpdate, onDelete, pageItems, onPageChange}) {
  return (
    <div>
      {isLoading ? 
        <div className="grid grid-cols-1 gap-4 md:gap-8  md:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="w-full h-40 rounded bg-gray-300" />
                <Skeleton className="w-full h-40 rounded bg-gray-300" />
                <Skeleton className="w-full h-40 rounded bg-gray-300" />
            </div> :  
      projects?.length > 0 ? (
        <div>
            <section className="flex flex-col gap-8">
                <div className="grid grid-cols-1 gap-4 md:gap-8  md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} id={project.id} name={project.name} updatedAt={project.updatedAt} owner={project.owner.name} ownerId={project.owner.id} access={project.access} onDelete={onDelete} onUpdate={onUpdate} />
                    ))}
              </div>
              {pageItems.total > pageItems.limit && (
                <PaginationNav onPageChange={onPageChange} {...pageItems}/>
              )}
               
           </section>
        </div>
      ) : (
        <div className="flex flex-col gap-8 items-center justify-center">
          <div className="mt-10" >
            <Image src="/no-data.svg" alt="No data found image" width={400} height={400} className="w-full max-w-lg" />
          </div>
          <h2 className="text-center text-primary-dark text-lg md:text-xl tracking-wide leading-[1.6]">No projects found</h2>
        </div>
      )}
    </div>
  );
}
