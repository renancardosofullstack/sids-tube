import { BarChart3, Eye, ThumbsUp, MessageSquare, Search, TrendingUp, Calendar, Tag, ArrowUpDown } from "lucide-react";

export const container =
  "p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-fadeIn text-slate-900 dark:text-slate-100";

export const header =
  "text-2xl font-bold flex items-center gap-2 mb-2 text-slate-900 dark:text-slate-100";

export const headerIcon = "text-blue-600 dark:text-blue-400";

export const headerSubtitle = "text-slate-500 dark:text-slate-400 mb-8";

export const tabsContainer =
  "flex gap-2 sm:gap-4 mb-6 sm:mb-8 border-b border-slate-200 dark:border-slate-700 px-4 sm:px-8 pt-6 sm:pt-8 overflow-x-auto";

export const tabButton = (isActive: boolean) => `
    pb-4 px-6 font-medium text-base transition-colors relative cursor-pointer
    ${isActive
    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}
`;

export const statsGrid =
  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8";

const cardBase =
  "bg-white dark:bg-slate-800 p-6 rounded-xl border shadow-sm transition-all hover:shadow-md border-slate-200 dark:border-slate-700";

const iconWrapperBase = "p-3 rounded-lg mb-4 w-fit";
const trendIconBase = "ml-auto";

export const statCardBlue = `${cardBase} border-blue-100 dark:border-blue-900`;
export const statIconWrapperBlue = `${iconWrapperBase} bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300`;
export const statTrendIconBlue = `${trendIconBase} text-blue-500 dark:text-blue-300`;
export const statLabelBlue = "text-sm font-medium text-slate-500 dark:text-slate-400 mb-1";
export const statValueBlue = "text-2xl font-bold text-slate-900 dark:text-slate-100";

export const statCardRed = `${cardBase} border-red-100 dark:border-red-900`;
export const statIconWrapperRed = `${iconWrapperBase} bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-300`;
export const statTrendIconRed = `${trendIconBase} text-red-500 dark:text-red-300`;
export const statLabelRed = "text-sm font-medium text-slate-500 dark:text-slate-400 mb-1";
export const statValueRed = "text-2xl font-bold text-slate-900 dark:text-slate-100";

export const statCardGreen = `${cardBase} border-green-100 dark:border-green-900`;
export const statIconWrapperGreen = `${iconWrapperBase} bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-300`;
export const statTrendIconGreen = `${trendIconBase} text-green-500 dark:text-green-300`;
export const statLabelGreen = "text-sm font-medium text-slate-500 dark:text-slate-400 mb-1";
export const statValueGreen = "text-2xl font-bold text-slate-900 dark:text-slate-100";

export const statCardPurple = `${cardBase} border-purple-100 dark:border-purple-900`;
export const statIconWrapperPurple = `${iconWrapperBase} bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-300`;
export const statTrendIconPurple = `${trendIconBase} text-purple-500 dark:text-purple-300`;
export const statLabelPurple = "text-sm font-medium text-slate-500 dark:text-slate-400 mb-1";
export const statValuePurple = "text-2xl font-bold text-slate-900 dark:text-slate-100";

export const tableContainer =
  "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden";

export const tableHeader =
  "p-6 border-b border-slate-200 dark:border-slate-700";

export const tableHeaderContent =
  "flex flex-col md:flex-row md:items-center justify-between gap-4";

export const tableTitle =
  "text-lg font-semibold text-slate-900 dark:text-slate-100";

export const searchWrapper = "relative w-full md:w-64 flex items-center";
export const searchIcon = "absolute left-3 text-slate-400 dark:text-slate-500";

export const searchInput =
  "w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

export const tableWrapper = "overflow-x-auto";
export const table = "w-full";

export const thead = "bg-slate-50 dark:bg-slate-900";
export const tbody = "divide-y divide-slate-200 dark:divide-slate-700";

export const thBase =
  "px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors";

export const thContent = "flex items-center gap-2";
export const thContentCenter = "flex items-center justify-center gap-2";
export const thCenter = `${thBase} text-center`;

export const thLeftHiddenMd = `${thBase} hidden md:table-cell`;
export const thLeftHiddenLg = `${thBase} hidden lg:table-cell`;
export const thCenterHiddenSm = `${thCenter} hidden sm:table-cell`;
export const hiddenSm = "hidden sm:inline";

export const tableRow =
  "hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors";

export const tdBase = "px-6 py-4 whitespace-nowrap text-slate-900 dark:text-slate-100";
export const tdHiddenMd = `${tdBase} hidden md:table-cell`;
export const tdCenter = `${tdBase} text-center`;
export const tdCenterHiddenSm = `${tdCenter} hidden sm:table-cell`;
export const tdLeftHiddenLg = `${tdBase} hidden lg:table-cell`;

export const videoTitle = "font-medium text-slate-900 dark:text-slate-100";
export const videoDescription = "text-sm text-slate-500 dark:text-slate-400 truncate max-w-[200px]";

export const categoryBadge =
  "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100";

export const categoryText = "truncate max-w-[100px]";

export const statBadgeBase =
  "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium";

export const statBadgeBlue = `${statBadgeBase} bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300`;
export const statBadgeRed = `${statBadgeBase} bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300`;
export const statBadgeGreen = `${statBadgeBase} bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300`;

export const emptyRow = "px-6 py-12 text-center";
export const emptyIcon = "mx-auto text-slate-300 dark:text-slate-600 mb-3";
export const emptyTitle = "text-slate-900 dark:text-slate-100 font-medium";
export const emptySubtitle = "text-sm text-slate-500 dark:text-slate-400";
