import { Suspense } from "react";
import CustomPagination from "@/components/UI/CustomPagination";
import FilterContent from "@/components/Layout/filter/filter";
import Loading from "@/components/loading/loading";
import { eventsData } from "@/constants/events.data";
import EventView from "./components/EventView";
import eventFilter from "@/constants/filters/eventsFilter";
import SearchBar from "@/components/UI/form/search-Input";

export default async function EventPage() {
  return (
    <main className="relative mb-8">
      <div className="flex justify-between gap-6">
        <Suspense fallback={<Loading />}>
          <FilterContent sections={eventFilter} />
        </Suspense>
        <div className="flex-1">
          <h1 className="my-6 text-center text-4xl font-bold md:text-start md:text-3xl">
            All Events
          </h1>
          <Suspense fallback={<Loading />}>
            <SearchBar parentClassName="mb-4" placeholder="Search for Events" />
            <EventView events={eventsData} />
            <CustomPagination totalItems={eventsData.length} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
