import Link from "next/link";

const DarkHeader: React.FC = () => {
  return (
    <header className="w-full bg-gray-900">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center">
          <Link href="/" className="text-xl font-bold text-white">
            Logo
          </Link>
          <nav className="ml-8 flex space-x-6">
            <Link href="/blog" className="text-gray-300 hover:text-white">
              All Posts
            </Link>
            <Link
              href="/blog/categories"
              className="text-gray-300 hover:text-white"
            >
              Categories
            </Link>
            <Link href="/blog/about" className="text-gray-300 hover:text-white">
              About Blog
            </Link>
          </nav>
          <div className="ml-auto">
            <input
              type="search"
              placeholder="Search blog..."
              className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-1 text-white"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DarkHeader;
