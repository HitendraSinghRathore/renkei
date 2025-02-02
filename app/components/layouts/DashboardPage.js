import Image from "next/image";

export default function DashboardPage({projects}) {
  return (
    <div>
      {projects?.length > 0 ? (
        <div>
          <div className="grid grid-cols-3 gap-4">
            <div>Project 1</div>
            <div>Project 1</div>
            <div>Project 1</div>
            <div>Project 1</div>
          </div>
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
