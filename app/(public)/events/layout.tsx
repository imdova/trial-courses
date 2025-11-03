"use client";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto px-6 lg:max-w-[1440px]">
      <div className="py-6">{children}</div>
    </div>
  );
};

export default Layout;
