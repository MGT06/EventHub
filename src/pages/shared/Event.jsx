import { useState } from "react";
import { ListSortDescendingIcon, Search } from "lucide-react";
import CardEvent from "../../components/cardComponents/CardEvent";
import dummy from "../../data/dummy.json";
import { useSearchParams } from "react-router";

const categories = [
  "All",
  "Technology",
  "Design",
  "Business",
  "Career",
  "AI",
  "Programming",
  "Music",
];
const locations = [
  "All Locations",
  "Bandung",
  "Jakarta",
  "Surabaya",
  "Yogyakarta",
  "Online",
];
const sortOptions = [
  "Upcoming",
  "Most Popular",
  "Almost Full",
  "Recently Added",
];

function Event() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);

  const title = searchParams.get("title") ?? "";
  const filCategory = searchParams.get("category") ?? "All";
  const filLocation = searchParams.get("location") ?? "All Locations";
  const filSort = searchParams.get("sortBy") ?? "Upcoming";

  function sortEvents(eventList, sortOption) {
    const sortedEvents = [...eventList];

    switch (sortOption) {
      case "Upcoming":
        return sortedEvents.sort(
          (eventA, eventB) => new Date(eventA.date) - new Date(eventB.date),
        );

      case "Most Popular":
        return sortedEvents.sort(
          (eventA, eventB) => eventB.attendees - eventA.attendees,
        );

      case "Almost Full": {
        const fillRate = (event) => event.attendees / event.capacity;
        return sortedEvents.sort(
          (eventA, eventB) => fillRate(eventB) - fillRate(eventA),
        );
      }

      case "Recently Added":
        return sortedEvents.sort((eventA, eventB) => eventB.id - eventA.id);

      default:
        return sortedEvents;
    }
  }

  const filteredEvents = sortEvents(
    dummy.event
      .filter((e) => e.status !== "ended")
      .filter((dataFilter) =>
        dataFilter.title.toLowerCase().includes(title.toLowerCase()),
      )
      .filter((e) => filCategory === "All" || e.tags.includes(filCategory))
      .filter(
        (e) => filLocation === "All Locations" || e.location === filLocation,
      ),
    filSort,
  );

  const pillClass = (isActive) =>
    `py-1.5 px-3 rounded-lg text-sm border cursor-pointer whitespace-nowrap ${
      isActive
        ? "bg-orange text-white border-orange"
        : "bg-white text-manatee border-gray-300"
    }`;

  return (
    <section>
      <div className="flex p-4 gap-3 justify-between border-b border-b-gray-200">
        <div className="flex py-2.5 px-3 gap-2 rounded-lg bg-gray-100 grow min-w-0">
          <Search className="text-manatee shrink-0" />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full min-w-0 outline-none"
            onChange={(e) => {
              setSearchParams((prevSearchParams) => {
                const newSearchParam = new URLSearchParams(prevSearchParams);
                if (e.target.value) {
                  newSearchParam.set("title", `${e.target.value}`);
                  return newSearchParam;
                }
                newSearchParam.delete("title");
                return newSearchParam;
              });
            }}
          />
        </div>
        <div
          onClick={() => setFilterOpen((prev) => !prev)}
          className={`py-2.5 px-3 border flex gap-2 items-center rounded-lg cursor-pointer shrink-0 ${
            filterOpen ? "border-orange text-orange" : "border-gray-200"
          }`}
        >
          <ListSortDescendingIcon />
          <p className="hidden sm:block text-sm font-medium">Filter</p>
        </div>
      </div>

      {filterOpen && (
        <div className="p-4 border-b border-b-gray-200 grid gap-4">
          <div>
            <p className="text-xs font-semibold text-manatee mb-2">CATEGORY</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setSearchParams((prevSearchParams) => {
                      const newSearchParams = new URLSearchParams(
                        prevSearchParams,
                      );
                      if (c !== "All") {
                        newSearchParams.set("category", c);
                        return newSearchParams;
                      }
                      newSearchParams.delete("category");
                      return newSearchParams;
                    });
                  }}
                  className={pillClass(filCategory === c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-manatee mb-2">
                LOCATION
              </p>
              <div className="flex flex-wrap gap-2">
                {locations.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setSearchParams((prevSearchParams) => {
                        const newSearchParams = new URLSearchParams(
                          prevSearchParams,
                        );
                        if (l !== "All Locations") {
                          newSearchParams.set("location", l);
                          return newSearchParams;
                        }
                        newSearchParams.delete("location");
                        return newSearchParams;
                      });
                    }}
                    className={pillClass(filLocation === l)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-manatee mb-2">SORT BY</p>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSearchParams((prevSearchParams) => {
                        const newSearchParams = new URLSearchParams(
                          prevSearchParams,
                        );
                        if (s !== "Upcoming") {
                          newSearchParams.set("sortBy",s);
                          return newSearchParams;
                        }
                        newSearchParams.delete("sortBy");
                        return newSearchParams;
                      });
                    }}
                    className={pillClass(filSort === s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="py-6 px-4 lg:px-13">
        <p className="text-sm text-manatee ">
          <span className="text-sm text-black font-semibold">
            {filteredEvents.length}
          </span>{" "}
          events found
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-5">
          {filteredEvents.map((e) => (
            <CardEvent key={e.id} event={e} />
          ))}
        </div>
        {filteredEvents.filter((e) => e.status !== "ended").length > 6 && (
          <div className="pt-8 grid justify-center">
            <span className="py-2 px-4 rounded-lg border border-gray-300 cursor-pointer">
              Load more events
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

export default Event;
