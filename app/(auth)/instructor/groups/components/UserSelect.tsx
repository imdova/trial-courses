import { Check, X, User, Users } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

interface Usertype {
  id: string;
  name: string;
  avatar?: string;
  type: "instructor" | "student";
}

interface Props {
  users: Usertype[];
  selected: string[];
  onChange: (selected: string[]) => void;
  userType: "instructors" | "students";
}

const UserSelect: React.FC<Props> = ({
  users,
  selected,
  onChange,
  userType,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (userId: string) => {
    if (selected.includes(userId)) {
      onChange(selected.filter((id) => id !== userId));
    } else {
      onChange([...selected, userId]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full relative space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select {userType.charAt(0).toUpperCase() + userType.slice(1)}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          className="w-full p-2 text-sm pl-8 border border-gray-200 rounded-md outline-none"
          placeholder={`Search ${userType}...`}
        />
        {userType === "instructors" ? (
          <User className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        ) : (
          <Users className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        )}
      </div>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm max-h-96 overflow-y-auto"
        >
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`flex items-center p-3 cursor-pointer transition-all ${
                  selected.includes(user.id)
                    ? "bg-green-50"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleToggle(user.id)}
              >
                <div className="flex items-center h-5">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selected.includes(user.id)}
                      onChange={() => handleToggle(user.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:border-green-600 text-white peer-checked:bg-green-600 flex items-center justify-center transition-colors duration-200">
                      <Check size={15} />
                    </div>
                  </label>
                </div>
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full h-8 w-8 object-cover ml-3"
                  />
                ) : (
                  <div
                    className={`ml-3 h-8 w-8 rounded-full flex items-center justify-center ${
                      user.type === "instructor"
                        ? "bg-green-100 text-green-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="ml-3 text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              No {userType} found
            </div>
          )}
        </div>
      )}

      {selected.length > 0 && (
        <div className="mt-4 space-y-3">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Selected {userType} ({selected.length})
          </h3>
          <div className="flex flex-col w-full gap-2">
            {selected.map((userId) => {
              const user = users.find((u) => u.id === userId);
              return user ? (
                <div
                  key={user.id}
                  className="flex items-center justify-between border border-gray-200 rounded-md px-3 py-1"
                >
                  <div className="flex items-center gap-2">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={24}
                        height={24}
                        className="rounded-full h-6 w-6 object-cover"
                      />
                    ) : (
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center ${
                          user.type === "instructor"
                            ? "bg-green-100 text-green-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="ml-2 text-sm text-gray-700">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={() => handleToggle(user.id)}
                    className="ml-2 text-gray-400 hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSelect;
