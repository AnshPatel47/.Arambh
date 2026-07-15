export default function FounderNote() {
  return (
    <section className="w-full bg-[#F6F4F0] py-24 md:py-28 reveal">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
        
        {/* Centered Tag Pill */}
        <div className="mx-auto max-w-[900px] text-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD6CA] bg-white px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#B68A45]" />
            <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-black">
              A Note From The Founder
            </span>
          </div>
        </div>

        {/* Centered Card Box with white background */}
        <div className="mx-auto max-w-[900px] rounded-[32px] border border-[#DDD6CA] bg-white p-8 md:p-12 text-center rv-up shadow-sm">
          
          <p className="text-[16px] md:text-[17px] leading-8 text-[#4D4D4C] font-medium mx-auto max-w-[760px]">
            Most founders do not fail at the idea. They get worn down by everything around it: 
            the forms, the deadlines, the consultant who stops replying the moment the invoice clears.
          </p>

          <p className="mt-6 text-[16px] md:text-[17px] leading-8 text-[#4D4D4C] font-medium mx-auto max-w-[760px]">
            We started Arambh because we had watched that happen too many times. So we built 
            the opposite. One advisor who knows your file, a fee you agree to up front, deadlines 
            we actually keep, and a relationship that does not end at a certificate.
          </p>

          <p className="mt-6 text-[16px] md:text-[17px] leading-8 text-[#4D4D4C] italic mx-auto max-w-[760px]">
            Buland vision. Seedhi guidance. Sahi Arambh. A bold vision, straight guidance, and 
            a right beginning. That is the whole promise, and we would like the chance to keep it for you.
          </p>

          {/* Thin separator line */}
          <div className="mt-8 border-t border-[#E6DFD4] w-full" />

          {/* Founder Signature Centered */}
          <div className="mt-8 flex flex-col items-center justify-center">
            <h4 className="text-[24px] md:text-[28px] font-serif italic text-[#131313] leading-none">
              Brijesh Desai
            </h4>

            <p className="mt-2 text-[14px] text-[#666666] font-medium">
              Founder, Arambh Advisory Services LLP
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}