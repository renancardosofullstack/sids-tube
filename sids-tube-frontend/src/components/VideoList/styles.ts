export const container = "w-full max-w-6xl mx-auto space-y-6";

export const forestHero = "relative overflow-hidden rounded-b-3xl sm:rounded-3xl min-h-[150px] bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 shadow-xl";
export const forestOverlay = "absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(167,243,208,0.18),transparent_35%),linear-gradient(135deg,rgba(6,78,59,0.92),rgba(15,23,42,0.95))]";
export const forestContent = "relative flex min-h-[150px] flex-col items-center justify-center px-6 py-8 text-center text-white";
export const forestBadge = "inline-flex rounded-full bg-emerald-50 px-5 py-2 text-sm font-bold text-emerald-800 shadow-sm";
export const forestTitle = "mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight";
export const forestSubtitle = "mt-2 max-w-2xl text-sm sm:text-base text-emerald-50/90";

export const panel = "rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-green-50 to-white p-5 sm:p-8 lg:p-12 shadow-sm";
export const title = "text-2xl sm:text-3xl font-extrabold text-slate-800 mb-6";

export const filtersContainer = "rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-5";
export const searchWrapper = "relative w-full flex items-center";
export const searchIcon = "absolute left-4 text-slate-400";
export const searchInput = "w-full rounded-lg border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";
export const categoryLabel = "ml-1 mb-3 text-xs font-bold uppercase tracking-wider text-slate-500";
export const categoryList = "flex gap-2 overflow-x-auto pb-2";

export const getCategoryButtonClass = (isSelected: boolean) =>
  `whitespace-nowrap rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 ${
    isSelected
      ? "border-slate-950 bg-slate-950 text-white shadow-md"
      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
  }`;

export const grid = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6";
export const card = "group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";
export const thumbnailWrapper = "relative h-52 overflow-hidden bg-slate-900";
export const thumbnailImage = "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105";
export const thumbnailOverlay = "absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent";
export const playIcon = "absolute inset-0 m-auto text-white drop-shadow-lg";
export const durationBadge = "absolute bottom-3 right-3 rounded bg-black/75 px-2 py-1 text-xs font-medium text-white";

export const cardContent = "p-5";
export const cardHeader = "mb-3 flex items-center justify-between gap-2";
export const categoryBadge = "inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700";
export const cardTitle = "mb-2 line-clamp-2 text-base font-extrabold leading-snug text-slate-900";
export const cardDescription = "mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600";
export const cardFooter = "mt-auto flex items-center justify-between border-t border-slate-100 pt-4";
export const dateWrapper = "flex items-center gap-1.5 text-xs text-slate-500";
export const deleteButton = "rounded-full p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600";

export const emptyStateContainer = "mt-6 rounded-xl border border-dashed border-slate-300 bg-white py-20 text-center";
export const emptyStateIconWrapper = "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100";
export const emptyStateIcon = "text-slate-400";
export const emptyStateTitle = "text-lg font-bold text-slate-900";
export const emptyStateText = "text-slate-500";
