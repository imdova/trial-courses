import { IconSkeleton } from "./loading";

const ExperienceSkeleton = () => {
  return (
    <div className="mt-5 rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5">
      <div className="mb-4 h-10">
        <h3 className="animate-pulse w-fit bg-gray-200 text-xl font-semibold text-transparent">
          Experience
        </h3>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
        {[0, 1].map((x) => (
          <div
            key={x}
            className="flex items-start gap-3 rounded-base border p-2"
          >
            <div className="h-[50px] w-[50px] animate-pulse rounded-full bg-gray-200" />
            <div className="flex-1">
              <div className=" flex items-center justify-between">
                <h6 className="w-fit animate-pulse bg-gray-200 font-semibold text-transparent">
                  name
                </h6>
              </div>
              <p className="w-fit animate-pulse bg-gray-200 text-sm text-transparent">
                title
              </p>
              <p className="w-fit animate-pulse bg-gray-200 text-sm text-transparent">
                <span>Jan 2020 - Dec 2021</span>
              </p>
              <div className="flex text-sm text-muted-foreground">
                <div className="-ml-1 text-base">
                  <IconSkeleton />
                </div>
                <p className="w-fit animate-pulse bg-gray-200 text-sm text-transparent">
                  location
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSkeleton;
