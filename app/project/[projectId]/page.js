import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectPage() {
    return (
        <div>
            <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
                <div className="">
                    <div className="flex items-center justify-start flex-wrap gap-4 md:gap-8 ">
                        <Link href='/dashboard'>
                            <MoveLeft />
                        </Link>
                  
                        <h1 className="text-lg md:text-xl font-bold leading-6 text-gray-900">
                           Sample
                        </h1>
                    </div>
                    </div>
                    </header>
            <h1>Project Page</h1>
        </div>
    );
}