"use client";

import React, { useState, useEffect } from "react";

export interface ServiceFormData {
  id?: string;
  title: string;
  category: string;
  description: string;
  price?: string | null;
  features: string[];
  icon?: string | null;
  status: string;
  
}

interface ServiceFormProps {
  initialData?: ServiceFormData | null;
  onSubmitSuccess?: (service: ServiceFormData) => void;
  onCancel?: () => void;
}

export default function ServiceForm({
  initialData,
  onSubmitSuccess,
  onCancel,
}: ServiceFormProps) {
  const [formData, setFormData] = useState<ServiceFormData>({
    title: "",
    category: "Registration",
    description: "",
    price: "",
    features: [],
    icon: "Briefcase",
    status: "active",
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
        category: initialData.category || "Registration",
        description: initialData.description || "",
        price: initialData.price || "",
        features: Array.isArray(initialData.features) ? initialData.features : [],
        icon: initialData.icon || "Briefcase",
        status: initialData.status || "active",
      });
      setFeaturesInput(
        Array.isArray(initialData.features) ? initialData.features.join(", ") : ""
      );
    } else {
      setFormData({
        title: "",
        category: "Registration",
        description: "",
        price: "",
        features: [],
        icon: "Briefcase",
        status: "active",
      });
      setFeaturesInput("");
    }
  }, [initialData]);

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

    const payload = {
      ...formData,
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
        setErrorMsg(data.error || "Failed to save service.");
        setIsSubmitting(false);
        return;
      }

      setSuccessMsg(
        formData.id ? "Service updated successfully!" : "Service created successfully!"
      );

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
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200 shadow-sm max-w-2xl w-full mx-auto">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-100">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">
            {formData.id ? "Edit Service" : "Create New Service"}
          </h2>
          <p className="text-xs text-zinc-900 mt-1">
            Fill in the service information to publish or update in backend DB
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
        {/* Service Title */}
        <div>
          <label className="block text-xs text-DM sans font-bold uppercase tracking-wider text-zinc-700 mb-2">
            Service Title *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Business Registration"
              className="w-full bg-zinc-50 border text-DM sans border-zinc-300 text-zinc-900 placeholder-zinc-500 py-3.5 pl-12 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C2943A] text-sm transition-all"
            />
          </div>
        </div>

        {/* Slug & Category */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-5"> */}
          {/* <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
              URL Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="e.g. business-registration"
              className="w-full bg-zinc-50 text-DM sans border border-zinc-300 text-zinc-900 placeholder-zinc-500 py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C2943A] text-sm transition-all font-mono"
            />
          </div> */}

          {/* <div> */}
            <label className="block text-xs text-DM sans font-bold uppercase tracking-wider text-zinc-900 mb-2">
              Category *
            </label>
            <input
              type="text"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Registration, Funding"
              className="w-full bg-zinc-50 border border-zinc-300 text-zinc-900 placeholder-zinc-500 py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C2943A] text-sm transition-all"
            />
          {/* </div> */}
        {/* </div> */}

        {/* Price & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
              Price ($)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">
                $
              </span>
              <input
                type="text"
                name="price"
                value={formData.price || ""}
                onChange={handleChange}
                placeholder="499"
                className="w-full bg-zinc-50 border border-zinc-300 text-zinc-900 placeholder-zinc-500 py-3.5 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C2943A] text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-DM sans font-bold uppercase tracking-wider text-zinc-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full text-DM sans bg-zinc-50 border border-zinc-300 text-zinc-900 py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C2943A] text-sm transition-all"
            >
              <option value="active">Active (Visible to Users)</option>
              <option value="inactive">Inactive (Hidden)</option>
            </select>
          </div>
        </div>

        {/* Description */}
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
            placeholder="Write a clear overview of what this service offers..."
            className="w-full text-DM sans bg-zinc-50 border border-zinc-300 text-zinc-900 placeholder-zinc-500 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C2943A] text-sm resize-none transition-all"
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-xs text-DM sans font-bold uppercase tracking-wider text-zinc-700 mb-2">
            Features (Comma Separated)
          </label>
          <input
            type="text"
            value={featuresInput}
            onChange={handleFeaturesChange}
            placeholder="e.g. 24/7 Support, Free Consultation, Tax Filing"
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
              <>
                <svg className="animate-spin h-4 w-4 text-zinc-950" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Saving Service...</span>
              </>
            ) : (
              <span>{formData.id ? "Update Service" : "Publish Service"}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
