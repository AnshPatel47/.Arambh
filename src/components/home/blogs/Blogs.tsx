import BlogsHeader from "./BlogsHeader";
import BlogsList from "./BlogsList";
import BlogButton from "./BlogButton";

export default function Blogs() {
  return (
    <section
      id="blogs"
      className="w-full bg-[#FBF7EE] py-12 sm:py-24"
    >
    <div className="mx-auto max-w-[1440px] px-6 lg:px-20 flex flex-col gap-8 sm:gap-12 w-full">
        {/* Header */}
        <BlogsHeader />

        {/* Cards + Button */}
        <div
          className="
            flex
            flex-col
            gap-4
            sm:gap-6
          "
        >
          <BlogsList />

          <BlogButton />
        </div>
      </div>
    </section>
  );
}