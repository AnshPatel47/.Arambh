"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ServiceForm, { ServiceFormData } from "@/components/admin/ServiceForm";

interface ServicesManagerProps {
  items?: any[];
  activeTypeFilter?: "ALL" | "SERVICE" | "SCHEME";
}

export default function ServicesManager({ items = [], activeTypeFilter = "ALL" }: ServicesManagerProps) {
  const [services, setServices] = useState<any[]>(items);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [listingType, setListingType] = useState<"SERVICE" | "SCHEME">("SERVICE");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceFormData | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (items && items.length > 0) {
      setServices(items);
    } else {
      fetchServices();
    }
  }, [items]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      if (data.success && Array.isArray(data.services)) {
        setServices(data.services);
      }
    } catch (err) {
      console.error("Failed to load services:", err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const openEditModal = (service: ServiceFormData) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDeleteService = async (id: string) => {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setDeleteConfirmId(null);
        fetchServices();
      } else {
        alert(data.error || "Failed to delete service");
      }
    } catch (err) {
      console.error("Delete service error:", err);
      alert("Error deleting service");
    }
  };

  const filteredServices = services.filter((s) => {

  const titleMatch = s.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
  const categoryMatch = s.category?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
  const descriptionMatch = s.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false;

  const matchesSearch = titleMatch || categoryMatch || descriptionMatch;
  const matchesStatus = statusFilter === "all" || s.status === statusFilter;
  const matchesType = (s.type || "SERVICE") === listingType; 

  return matchesSearch && matchesStatus && matchesType;
});

 return (
  <div className="space-y-4">
    {/* SINGLE CONTROL BAR - Search, Status, Listing Type, and Add Button */}
    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-zinc-50/50 p-4 rounded-xl border border-zinc-200">
      <div className="flex flex-1 flex-col sm:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder={`Search ${listingType === "SCHEME" ? "schemes" : "services"}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2943A] text-zinc-900 placeholder-zinc-400"
          />
          <svg
            className="w-4 h-4 text-zinc-500 absolute left-3 top-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Status Dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2943A] text-zinc-700"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Filter Listing Type Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={listingType}
            onChange={(e) => setListingType(e.target.value as "SERVICE" | "SCHEME")}
            className="px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2943A] text-zinc-700"
          >
            <option value="SERVICE">Services</option>
            <option value="SCHEME">Schemes</option>
          </select>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={openCreateModal}
        className="px-5 py-2.5 bg-[#C2943A] hover:bg-[#b08432] text-zinc-950 font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
        Add {listingType === "SCHEME" ? "Scheme" : "Service"}
      </button>
    </div>


      {/* Services Table */}
      <div className="overflow-x-auto border border-zinc-300 rounded-xl shadow-sm bg-white">
        <table className="min-w-full divide-y divide-zinc-300 text-left text-sm">
          <thead className="bg-zinc-50 text-zinc-900 uppercase font-semibold text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Item</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Features</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 text-zinc-700">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                  <div className="inline-flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-[#C2943A]" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Loading services...</span>
                  </div>
                </td>
              </tr>
            ) : filteredServices.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                  No services found. Click <strong>"+ Add Service"</strong> to create one.
                </td>
              </tr>
            ) : (
              filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-zinc-900">{service.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full uppercase tracking-wide border ${
                        service.type === "SCHEME"
                          ? "bg-purple-50 text-purple-700 border-purple-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      {service.type || "SERVICE"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-zinc-100 text-zinc-700 rounded-md text-[12px] font-medium border border-zinc-300 whitespace-nowrap">
                      {service.category}
                    </span>
                  </td>

                <td className="px-6 py-4 font-medium text-zinc-900">
  {service.price ? `₹${service.price}` : "-"}
</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        service.status === "active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-zinc-100 text-zinc-700 border border-zinc-300"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          service.status === "active" ? "bg-emerald-500" : "bg-zinc-400"
                        }`}
                      />
                      {service.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {service.features && service.features.length > 0 ? (
                      <div className="text-sm text-zinc-800 max-w-xs truncate">
                        {service.features.join(" • ")}
                      </div>
                    ) : (
                      <span className="text-zinc-400 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(service)}
                      className="px-3 py-1.5 text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-md transition-colors border border-zinc-300 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(service.id!)}
                      className="px-3 py-1.5 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition-colors border border-red-300 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

     {/* Service Modal Rendered via React Portal directly into body */}
      {isModalOpen && mounted && createPortal(
        <div 
          onClick={() => setIsModalOpen(false)} // Closes modal when clicking backdrop
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside form
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto my-auto cursor-default"
          >
<ServiceForm
  initialData={editingService}
  activeTypeFilter={listingType}
  onCancel={() => setIsModalOpen(false)}
  onSubmitSuccess={(savedService) => {
    setIsModalOpen(false);
    setServices((prev) => {
      const exists = prev.some((s) => s.id === savedService.id);
      if (exists) {
        // Update ONLY the target service in state without refreshing the entire list
        return prev.map((s) => (s.id === savedService.id ? savedService : s));
      }
      return [savedService, ...prev];
    });
  }}
/>
          </div>
        </div>,
        document.body
      )}

    {/* Delete Modal Rendered via React Portal */}
      {deleteConfirmId && mounted && createPortal(
        <div 
          onClick={() => setDeleteConfirmId(null)} // Closes modal when clicking backdrop
          className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside modal box
            className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-zinc-200 text-center cursor-default"
          >
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-2">Delete Service?</h3>
            <p className="text-xs text-zinc-500 mb-6">
              Are you sure you want to delete this service? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteService(deleteConfirmId)}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div> 
  );
}