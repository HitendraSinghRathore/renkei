"use client";


export default function ScrollToTopButton() {
  function handleScrollTop(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={handleScrollTop}
      aria-label="Scroll to Top"
      aria-hidden="true"
      className="
        font-serif
        sr-only
        focus:not-sr-only
        focus:absolute
        focus:top-6
        focus:left-4
        focus:z-50
        bg-primary
        text-white
        text-base
        sm:text-lg
        md:text-xl
        lg:text-2xl
        rounded
      "
      tabIndex="0"
    >
      Scroll to Top
    </button>
  );
}
