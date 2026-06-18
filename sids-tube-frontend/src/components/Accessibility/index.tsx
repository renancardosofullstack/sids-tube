import React, { useState } from "react";

const Accessibility: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<number>(100);

  const toggleTheme = () => document.documentElement.classList.toggle("dark");
  const toggleContrast = () => document.documentElement.classList.toggle("contrast");

  const increase = () => {
    const next = Math.min(size + 10, 200);
    setSize(next);
    document.documentElement.style.fontSize = `${next}%`;
  };

  const decrease = () => {
    const next = Math.max(size - 10, 60);
    setSize(next);
    document.documentElement.style.fontSize = `${next}%`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        aria-label="Abrir opções de acessibilidade"
        onClick={() => setOpen((v) => !v)}
        className="bg-slate-800 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-slate-700 transition"
      >
        A+
      </button>

      {open && (
        <div className="mt-2 w-40 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-2 flex flex-col gap-2">
          <button onClick={toggleTheme} className="text-left px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700">Modo escuro</button>
          <button onClick={toggleContrast} className="text-left px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700">Alto contraste</button>
          <div className="flex items-center justify-between px-2">
            <button onClick={decrease} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700">A-</button>
            <span className="text-sm">{size}%</span>
            <button onClick={increase} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700">A+</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accessibility;
