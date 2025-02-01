
import Image from 'next/image';
import Link from 'next/link';

export default function MainFooter() {
    return (
        <footer className="w-full px-2 sm:px-4">
            <div className="mx-auto bg-gray-100 w-full pt-8  rounded-t-xl border-none border border-gray-200">
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-2 border-b border-gray-200 pb-4 mb-4 px-2 md:px-4 justify-between items-center">
                    <div className="py-6 px-4 flex-1 w-full sm:w-1/2 md:w-1/3 sm:border-r  border-gray-200">
                        <h4 className="text-primary-dark font-bold text-xl mb-2 sm:mb-4">Renkei</h4>
                        <h5 className="text-2xl md:text-3xl leading-[1.05] tracking-tight ">Stay Organized and <br/> boost productivity</h5> 
                    </div>
                    <div className="px-4 md:px-6 w-full sm:w-60">
                        <div className="mb-4 sm:mb-8">
                            <ul>
                                <li className="mb-2 text-sm md:text-base hover:text-pink-600 hover:underline">
                                    <Link href="/auth/login" >
                                    Sign in</Link>
                                </li>
                                <li className="mb-2 text-sm  md:text-base hover:text-pink-600 hover:underline">
                                    <Link href="/auth/signup" >Sign up </Link>
                                </li>
                          
                                <li className="mb-2 text-sm  md:text-base hover:text-pink-600 hover:underline">
                                    <Link href="/dashboard" > Dashboard</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-row gap-2 sm:gap-4">
                            <a href="https://github.com/HitendraSinghRathore/renkei" className="text-primary-dark hover:text-pink-600 hover:underline">
                            <Image src="/icons8-github.svg" alt="Github Logo" width={30} height={30} className="w-5 sm:w-8 h-5 sm:h-8" />
                            </a>
                            <a href="https://www.linkedin.com/in/hitendra-rathore/" className="text-primary-dark hover:text-pink-600 hover:underline ">
                            <Image src="/icons8-linkedin.svg" alt="Linkedin Logo" width={30} height={30} className="w-5 sm:w-8 h-5 sm:h-8" />
                            </a>
                            <a href="mailto:hitendrarathore0@gmail.com" className="text-primary-dark hover:text-pink-600 hover:underline ">
                            <Image src="/icons8-gmail.svg" alt="Gmail Logo" width={30} height={30} className="w-5 h-5 sm:w-8 sm:h-8" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="py-1 px-2 md:px-4 text-xs">
                    Made with ❤️ by <a href="https://github.com/HitendraSinghRathore" className="text-primary-dark hover:text-pink-600 hover:underline mr-2">Hitendra Rathore</a>
                    &copy; {new Date().getFullYear()}
                </div>
            </div>
           
        </footer>
    )
}