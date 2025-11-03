import React, { useState } from "react";
import { Download } from "lucide-react";

interface ExportOptions {
  data: string; // The content to export (e.g., CSV or JSON content).
}

const ExportBtnIcon = ({ data }: ExportOptions) => {
  const [anchorElButton, setAnchorElButton] =
    React.useState<null | HTMLElement>(null);
  const [selectedValue, setSelectedValue] = useState("text/csv");
  const openButton = Boolean(anchorElButton);

  const handleExport = () => {
    if (!selectedValue) return;

    const blob = new Blob([data], { type: selectedValue });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `export.${selectedValue === "text/pdf" ? "pdf" : "csv"}`;
    a.click();
    window.URL.revokeObjectURL(url);
    handleCloseButton();
  };

  const handleClickButton = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElButton(event.currentTarget);
  };

  const handleCloseButton = () => {
    setAnchorElButton(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClickButton}
        className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white hover:bg-primary-900"
      >
        <Download className="text-xl" />
      </button>

      {openButton && (
        <div className="absolute left-0 top-full z-50 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-3">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Please Choose:
              </label>
              <div className="space-y-2" onChange={handleChange}>
                <label className="flex items-center space-x-2 text-xs cursor-pointer">
                  <input
                    type="radio"
                    className="h-3 w-3 text-primary focus:ring-primary"
                    value="text/csv"
                    checked={selectedValue === "text/csv"}
                    onChange={handleChange}
                  />
                  <span>Download in Excel</span>
                </label>
                <label className="flex items-center space-x-2 text-xs cursor-pointer">
                  <input
                    type="radio"
                    className="h-3 w-3 text-primary focus:ring-primary"
                    value="text/pdf"
                    checked={selectedValue === "text/pdf"}
                    onChange={handleChange}
                  />
                  <span>Download in PDF</span>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={handleExport}
                className="w-full rounded bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportBtnIcon;
