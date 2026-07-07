import { Sparkles, ShieldCheck } from "lucide-react";

export default function HeroBadges() {
  return (
    <div className="mt-8 flex flex-col gap-4">

      <div
        className="
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-[#E8E1D8]
        bg-[#F8F6F2]
        p-4
      "
      >
        <div
          className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-[#F7E6C4]
        "
        >
          <Sparkles
            className="text-[#A87718]"
            size={22}
          />
        </div>

        <div>
          <h4 className="font-semibold">
            Faster Approvals
          </h4>

          <p className="text-sm text-neutral-600">
            Expert guidance with faster processing.
          </p>
        </div>
      </div>

      <div
        className="
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-[#E8E1D8]
        bg-[#F8F6F2]
        p-4
      "
      >
        <div
          className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-[#F7E6C4]
        "
        >
          <ShieldCheck
            className="text-[#A87718]"
            size={22}
          />
        </div>

        <div>
          <h4 className="font-semibold">
            Transparent Process
          </h4>

          <p className="text-sm text-neutral-600">
            Clear communication at every step.
          </p>
        </div>
      </div>

    </div>
  );
}