export const inner = "w-full max-w-[1920px] mx-auto px-4 sm:px-10 space-y-6";
export const container = "p-4 sm:p-8 max-w-[1920px] mx-auto space-y-6";

export const grid =
  "grid gap-4 sm:gap-6 grid-cols-3 max-[640px]:grid-cols-2 w-full mx-auto";

export const card =
  "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer h-full";

export const thumbnailWrapper =
  "h-28 sm:h-40 lg:h-52 bg-slate-800 relative overflow-hidden transition-all";

export const cardContent = "p-4 sm:p-5 flex flex-col flex-1";

export const cardTitle =
  "text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mb-1 sm:mb-2 line-clamp-2 leading-tight";

export const cardDescription =
  "hidden lg:block text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2 flex-1";

export const emptyStateContainer = "text-center py-20 bg-white dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-600";
export const emptyStateIconWrapper = "mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4";
export const emptyStateIcon = "text-slate-400 dark:text-slate-500";
export const emptyStateTitle = "text-lg font-medium text-slate-900 dark:text-slate-100";
export const emptyStateText = "text-slate-500 dark:text-slate-400";

export const getCategoryButtonClass = (isSelected: boolean) => `px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${isSelected
  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-md'
  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'
  }`;

export const header = "flex justify-between items-end gap-4";
export const title = "text-2xl font-bold text-slate-800 dark:text-slate-100";

export const filtersContainer = "bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-5";
export const searchWrapper = "relative w-full flex items-center";
export const searchIcon = "absolute left-4 text-slate-400 dark:text-slate-500";
export const searchInput = "w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600";

export const categoryLabel = "text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 ml-1";
export const categoryList = "flex gap-2 overflow-x-auto pb-2";

export const thumbnailOverlay = "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent";
export const playIcon = "absolute inset-0 m-auto text-white opacity-80";
export const durationBadge = "absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded";

export const cardHeader = "flex justify-between items-start mb-3";
export const categoryBadge = "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] sm:text-xs font-semibold";
export const cardFooter = "flex items-center justify-between pt-2 sm:pt-4 border-t border-slate-100 dark:border-slate-700 mt-auto";
export const dateWrapper = "flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400";
export const deleteButton = "text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1 sm:p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900";