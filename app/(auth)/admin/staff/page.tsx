"use client";

import StaffTable from "../components/StaffTable";

export default function StaffPage() {
  return (
    <div>
      <h2 className="my-6 text-2xl font-bold">Staff</h2>
      <div className="box-content">
        <StaffTable />
      </div>
    </div>
  );
}
