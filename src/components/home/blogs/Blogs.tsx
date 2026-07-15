import BlogsHeader from "./BlogsHeader";
import BlogsList from "./BlogsList";
import BlogButton from "./BlogButton";

export default function Blogs() {
  return (
    <section
      id="blogs"
      className="w-full bg-[#FFF8F6] py-24"
    >
      <div
        className="
          mx-auto
          max-w-[1440px]
          px-6
          lg:px-20
          flex
          flex-col
          gap-16
        "
      >
        {/* Header */}
        <BlogsHeader />

        {/* Cards + Button */}
        <div
          className="
            flex
            flex-col
            gap-10
          "
        >
          <BlogsList />

          <BlogButton />
        </div>
      </div>
    </section>
  );
}