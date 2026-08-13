import SectionHeader from "@/components/SectionHeader";

export default function BlogsHeader() {
  return (
    <div
      className="
        flex
        w-full
        flex-col
        items-center
        gap-6
      "
    >
      {/* Heading */}
      <SectionHeader
        align="center"
        title="Insights & Guides"
      />

      {/* Horizontal divider line (width matches card row) */}
      <div className="w-full h-px bg-[#E6DFD4]" />
    </div>
  );
}