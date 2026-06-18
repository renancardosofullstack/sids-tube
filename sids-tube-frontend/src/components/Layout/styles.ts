export const container = "min-h-screen flex bg-gradient-to-br from-white via-emerald-50 to-white";
export const sidebar = "w-64 bg-slate-900 text-white flex flex-col fixed h-full shadow-xl z-30 transition-transform duration-300 ease-in-out";
export const getSidebarClass = (isOpen: boolean) =>
  `${sidebar} ${isOpen ? "translate-x-0" : "-translate-x-full"}`;
export const brandContainer = "p-6 flex items-center gap-3 border-b border-slate-700";
export const brandName = "font-bold text-lg tracking-tight";
export const brandSubtitle = "text-xs text-slate-400";
export const nav = "flex-1 py-6 px-3 space-y-2 overflow-y-auto";
export const navSection = "pt-4 mt-4 border-t border-slate-800";
export const navSectionTitle = "px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2";
export const footer = "p-4 border-t border-slate-700";
export const logoutButton = "flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors w-full";
export const main = "flex-1 w-full p-4 sm:p-6 lg:p-8 text-slate-900 transition-colors";
export const contentWrapper = "max-w-6xl mx-auto";

export const menuButton = "fixed top-4 left-3 z-40 bg-emerald-950 text-white p-2 rounded-lg shadow-lg hover:bg-emerald-900 transition-colors";
export const overlay = "fixed inset-0 bg-black/50 z-20";

export const getButtonClass = (isActive: boolean) =>
  `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
    isActive
      ? "bg-amber-600 text-white shadow-lg"
      : "text-slate-300 hover:bg-slate-800 hover:text-white"
  }`;
