import React from 'react';
import { ArrowDown } from 'lucide-react';

export interface LoadMorePaginationProps {
  hasMore: boolean;
  onLoadMore: () => void | Promise<void>;
  isLoading?: boolean;
  buttonText?: string;
  className?: string;
}

export function LoadMorePagination({
  hasMore,
  onLoadMore,
  isLoading = false,
  buttonText = 'Load More Articles',
  className = '',
}: LoadMorePaginationProps) {
  if (!hasMore) return null;

  return (
    <div className={`w-full border-t border-zinc-300 mt-0 pt-4 lg:mt-12 lg:pt-8 justify-center ${className} flex`}>
      <button
        type="button"
        onClick={onLoadMore}
        disabled={isLoading}
        className="px-9 py-3  rounded-full bg-white hover:border-[#BD8E32] hover:text-[#BD8E32] text-zinc-900 font-semibold text-sm border border-zinc-300 transition-all flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Loading...' : buttonText}
        {!isLoading && <ArrowDown className="w-4 h-4" />}
      </button>
    </div>
  );
}

export default LoadMorePagination;