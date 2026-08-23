import { Search } from "lucide-react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import CardCommunities from "../../components/cardComponents/CardCommunities";
import useJoin from "../../hooks/useJoin";

const joinStatusOptions = ["All", "Joined", "Not Joined"];
const categories = [
  "All Categories",
  "Technology",
  "Design",
  "Business",
  "Career",
  "AI",
  "Programming",
  "Music",
];

function Communities() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isJoined } = useJoin("joinedCommunities");
  const { dataCommunity } = useSelector((state) => state.communityState);

  const title = searchParams.get("title") ?? "";
  const filJoinStatus = searchParams.get("joinStatus") ?? "All";
  const filCategory = searchParams.get("category") ?? "All Categories";

  function sortCommunities(communityList, joinStatus) {
    const sortedCommunities = [...communityList];

    switch (joinStatus) {
      case "Joined":
        return sortedCommunities.filter((c) => isJoined(c.id));

      case "Not Joined":
        return sortedCommunities.filter((c) => !isJoined(c.id));

      default:
        return sortedCommunities;
    }
  }

  const filteredCommunities = sortCommunities(
    dataCommunity
      .filter((c) => c.name.toLowerCase().includes(title.toLowerCase()))
      .filter(
        (c) => filCategory === "All Categories" || c.tags.includes(filCategory),
      ),
    filJoinStatus,
  );

  const pillClass = (isActive) =>
    `text-xs rounded-md py-1.5 px-3 cursor-pointer whitespace-nowrap ${
      isActive ? "text-white bg-orange" : "border border-gray-200 text-black"
    }`;

  return (
    <>
      <section className=" bg-black lg:grid py-10 px-4 lg:grid-cols-4">
        <div className="text-center col-span-4">
          <h2 className="text-white text-3xl font-bold">Explore Communities</h2>

          <p className="text-gray-400 mt-4 text-sm ">
            Join communities that match your interests and get personalized
            event recommendations.
          </p>
        </div>

        <form className="mt-8 flex items-center bg-white rounded-xl px-2 py-2 lg:col-start-2 lg:col-end-4 ">
          <Search width={20} className="pl-1 text-manatee" />
          <input
            type="text"
            placeholder="Search communities..."
            className="flex-1 px-3 py-3.5 text-sm text-black outline-none"
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
        </form>
      </section>
      <section className="py-6 px-4 lg:px-14">
        <div className="grid gap-3 lg:flex">
          <div className="flex gap-1">
            {joinStatusOptions.map((s) => (
              <span
                key={s}
                onClick={() => {
                  setSearchParams((prevSearchParams) => {
                    const newSearchParams = new URLSearchParams(
                      prevSearchParams,
                    );
                    if (s !== "All") {
                      newSearchParams.set("joinStatus", s);
                      return newSearchParams;
                    }
                    newSearchParams.delete("joinStatus");
                    return newSearchParams;
                  });
                }}
                className={pillClass(filJoinStatus === s)}
              >
                {s}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {categories.map((c) => (
              <span
                key={c}
                onClick={() => {
                  setSearchParams((prevSearchParams) => {
                    const newSearchParams = new URLSearchParams(
                      prevSearchParams,
                    );
                    if (c !== "All Categories") {
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
              </span>
            ))}
          </div>
        </div>
        <div className="pt-2 lg:pt-6">
          <p className="text-manatee text-sm">
            <span className="font-semibold text-black text-sm">
              {filteredCommunities.length}
            </span>{" "}
            communities
          </p>
          <div className="grid gap-4 lg:grid-cols-4 pt-4 ">
            {filteredCommunities.map((c) => (
              <CardCommunities key={c.id} community={c} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Communities;
