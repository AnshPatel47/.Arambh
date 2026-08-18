"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface ServiceFormData {
  id?: string;
  title: string;
  category: string;
  description: string;
  price?: string | null;
  features: string[];
  icon?: string | null;
  status: string;
  type?: "SERVICE" | "SCHEME";
}

interface ServiceFormProps {
  initialData?: ServiceFormData | null;
  activeTypeFilter?: "ALL" | "SERVICE" | "SCHEME";
  onSubmitSuccess?: (service: ServiceFormData) => void;
  onCancel?: () => void;
}

export default function ServiceForm({
  initialData,
  activeTypeFilter = "SERVICE",
  onSubmitSuccess,
  onCancel,
}: ServiceFormProps) {
  const router = useRouter();
  const isScheme = activeTypeFilter === "SCHEME" || initialData?.type === "SCHEME";
  const itemTypeLabel = isScheme ? "Scheme" : "Service";

  const [formData, setFormData] = useState<ServiceFormData>({
    title: "",
    category: isScheme ? "Government Scheme" : "Registration",
    description: "",
    price: "",
    features: [],
    icon: "Briefcase",
    status: "active",
    type: isScheme ? "SCHEME" : "SERVICE",
  });

  const [featuresInput, setFeaturesInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
  if (initialData) {
    setFormData({
      id: initialData.id,
      title: initialData.title || "",
      category: initialData.category || (isScheme ? "Government Scheme" : "Registration"),
      description: initialData.description || "",
      price: initialData.price || "",
      features: Array.isArray(initialData.features) ? initialData.features : [],
      icon: initialData.icon || "Briefcase",
      status: initialData.status || "active",
      type: initialData.type || (isScheme ? "SCHEME" : "SERVICE"),
    });
    setFeaturesInput(
      Array.isArray(initialData.features) ? initialData.features.join(", ") : ""
    );
  } else {
    setFormData({
      title: "",
      category: isScheme ? "Government Scheme" : "Registration", // DYNAMIC CATEGORY
      description: "",
      price: "",
      features: [],
      icon: "Briefcase",
      status: "active",
      type: isScheme ? "SCHEME" : "SERVICE",
    });
    setFeaturesInput("");
  }
}, [initialData, isScheme]); 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeaturesInput(e.target.value);
  };

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const parsedFeatures = featuresInput
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    // Explicitly pass type to backend payload
    const payload = {
      ...formData,
      type: isScheme ? "SCHEME" : "SERVICE",
      features: parsedFeatures,
    };

    try {
      let url = "/api/services";
      let method = "POST";

      if (formData.id) {
        url = `/api/services/${formData.id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || `Failed to save ${itemTypeLabel.toLowerCase()}.`);
        setIsSubmitting(false);
        return;
      }

      setSuccessMsg(
        formData.id ? `${itemTypeLabel} updated successfully!` : `${itemTypeLabel} created successfully!`
      );

      // Revalidate data on current route so UI updates in real-time
      router.refresh();

      if (onSubmitSuccess) {
        onSubmitSuccess(data.service || payload);
      }
    } catch (err) {
      console.error("ServiceForm submission error:", err);
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
   <div className="w-full bg-white p-6 sm:p-8 rounded-2xl">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-100">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">
            {formData.id ? `Edit ${itemTypeLabel}` : `Create New ${itemTypeLabel}`}
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Fill in the {itemTypeLabel.toLowerCase()} information to publish or update in backend DB
          </p>
        </div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-zinc-400 hover:text-zinc-600 p-2 rounded-lg hover:bg-zinc-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
       {/* Title */}
        <div>
          <label className="block text-xs text-DM sans font-bold uppercase tracking-wider text-zinc-700 mb-2">
            {itemTypeLabel} Title *
          </label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder={isScheme ? "e.g. NAIF Scheme" : "e.g. Business Registration"}
            className="w-full bg-zinc-50 border text-DM sans border-zinc-300 text-zinc-900 placeholder-zinc-500 py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C2943A] text-sm transition-all"
          />
        </div>

         {/* Category */}
<div>
  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
    Category *
  </label>
  <input
    type="text"
    name="category"
    required
    value={formData.category}
    onChange={handleChange}
    placeholder={isScheme ? "e.g. Government Scheme, Subsidy" : "e.g. Registration, Compliance"}
    className="w-full bg-zinc-50 border border-zinc-300 text-zinc-900 placeholder-zinc-500 py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C2943A] text-sm transition-all font-normal"
  />
</div>

{/* Price / Funding Field */}
<div>
  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
    {isScheme ? "Funding / Grant Amount" : "Price ($)"}
  </label>
  <div className="relative">
    {!isScheme && (
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">
        $
      </span>
    )}
    <input
      type="text"
      name="price"
      value={formData.price || ""}
      onChange={handleChange}
      placeholder={isScheme ? "e.g. Up to 50 Lakhs / Free" : "499"}
      className={`w-full bg-zinc-50 border border-zinc-300 text-zinc-900 placeholder-zinc-500 py-3.5 ${
        !isScheme ? "pl-10 pr-4" : "px-4"
      } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C2943A] text-sm transition-all`}
    />
  </div>
</div>

{/* Description Field */}
<div>
  <label className="block text-xs text-DM sans font-bold uppercase tracking-wider text-zinc-700 mb-2">
    Description *
  </label>
  <textarea
    name="description"
    required
    rows={4}
    value={formData.description}
    onChange={handleChange}
    placeholder={
      isScheme
        ? "Write a clear overview of eligibility criteria and government scheme benefits..."
        : "Write a clear overview of what this service offers..."
    }
    className="w-full text-DM sans bg-zinc-50 border border-zinc-300 text-zinc-900 placeholder-zinc-500 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C2943A] text-sm resize-none transition-all"
  />
</div>

{/* Features / Benefits Field */}
<div>
  <label className="block text-xs text-DM sans font-bold uppercase tracking-wider text-zinc-700 mb-2">
    {isScheme ? "Key Scheme Benefits (Comma Separated)" : "Features (Comma Separated)"}
  </label>
  <input
    type="text"
    value={featuresInput}
    onChange={handleFeaturesChange}
    placeholder={
      isScheme
        ? "e.g. 100% Tax Exemption, Collateral Free Loan, Interest Subvention"
        : "e.g. 24/7 Support, Free Consultation, Tax Filing"
    }
    className="w-full text-DM sans bg-zinc-50 border border-zinc-300 text-zinc-900 placeholder-zinc-500 py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C2943A] text-sm transition-all"
  />
</div>

        {/* Buttons */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-3 text-sm font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
         <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3.5 bg-[#C2943A] hover:bg-[#b08432] text-zinc-950 font-bold text-sm rounded-xl shadow-md transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Saving {itemTypeLabel}...</span>
            ) : (
              <span>{formData.id ? `Update ${itemTypeLabel}` : `Publish ${itemTypeLabel}`}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
