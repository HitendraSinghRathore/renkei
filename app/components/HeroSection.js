import Link from "next/link";
export default function HeroSection() {
  return (
    <section className="mx-auto mt-4 mb-10 md:mt-8 md:mb-20 w-100 px-4">
      <div className="w-full mx-auto bg-red-100 border border-gray-200 rounded-xl hero-section flex flex-col items-center justify-center py-16 px-4 md:py-24 md:px-6 lg:py-40 lg:pt-30 lg:px-8 ">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-primary-dark tracking-tight leading-[1.10] mb-4 md:mb-6">
          Think, plan and create<br/>
          <span className="text-pink-300 leading-[1.10]">All in one place</span>
        </h1>
        <h2 className="mb-6 md:mb-8 text-pretty text-center text-primary-dark text-lg md:text-xl tracking-wide">A collaborative whiteboard app to create and share your ideas.</h2>
        <Link
          aria-label="navigate to dashboard"
          role="button"
          href="/"
          className="bg-primary hover:bg-pink-600 text-white rounded-xl transition px-4 py-2 sm:py-4 font-bold text-sm md:text-lg md:text-base hover:shadow-md"
        >
          Go to dashboard
        </Link>
      </div>
    </section>
  );
}
