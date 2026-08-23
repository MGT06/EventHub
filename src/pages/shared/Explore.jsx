import { Sparkles, Search } from "lucide-react";
import CardEvent from "../../components/cardComponents/CardEvent";
import CardCommunities from "../../components/cardComponents/CardCommunities";
import dummy from "../../data/dummy.json";
import { useSelector } from "react-redux";


function Explore() {
  const { dataEvent } = useSelector((state) => state.eventState);

  return (
    <>
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(234,88,12,0.35),transparent_65%)]" />

        <div className="relative z-10  text-center py-24 px-4 flex flex-col justify-center items-center">
          <div className="flex items-center gap-2 text-orange-500 text-xs font-medium border border-orange-500/30 rounded-full px-3 py-1 mb-6">
            <Sparkles width={12} />
            <span className="">Discover · Connect · Participate</span>
          </div>

          <h2 className="text-white text-4xl sm:text-5xl font-bold leading-tight">
            Find events that{" "}
            <span className="text-orange-500">actually matter</span> to you
          </h2>

          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Join workshops, conferences, and meetups in Indonesia's best tech
            communities — or create your own.
          </p>

          <form className="mt-8 flex items-center bg-white rounded-xl px-2 py-2 lg:w-1/2">
            <Search width={20} className="pl-1 text-manatee" />
            <input
              type="text"
              placeholder="Search events, topics, or locations..."
              className="flex-1 px-3 py-3.5 text-sm outline-none text-black"
            />
            <button className="bg-orange-500 text-white text-sm font-medium px-5 py-2 rounded-xl">
              Search
            </button>
          </form>

          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-gray-400">
            <span>Technology</span>
            <span>AI</span>
            <span>Design</span>
            <span>Business</span>
            <span>Programming</span>
            <span>Music</span>
          </div>
        </div>
      </section>
      <section className="py-5 px-4 lg:py-10 lg:px-13">
        <h3 className="font-bold text-lg">Discover events that interest you</h3>
        <div className="grid gap-4 lg:grid-cols-3 pt-5">
          {dataEvent
            .filter((e) => e.status !== "ended")
            .map((e) => (
              <CardEvent key={e.id} event={e} />
            ))}
        </div>
      </section>

      <section className="py-5 px-4 lg:py-10 lg:px-13">
        <h3 className="font-bold text-lg">Popular Communities</h3>
        <div className="pt-5 grid gap-4 lg:grid-cols-4">
          {dummy.communities.slice(0, 4).map((c) => (
            <CardCommunities key={c.id} community={c} />
          ))}
        </div>
      </section>
      <section className="py-5 px-4 lg:py-10 lg:px-13">
        <h3 className="font-bold text-lg">What the community says</h3>
        <div className="pt-5 grid gap-4 lg:grid-cols-3">
          <div className="grid gap-4 rounded-lg border border-gray-300 p-5">
            <span className="text-4xl text-orange">"</span>
            <p className="text-sm">
              EventHub completely changed how I network. I met my current
              co-founder at a Jakarta AI meetup I found here. The community
              pages make it so easy to find people who are into the same things.
            </p>
            <div className="flex gap-3 items-center ">
              <div className="bg-blue-700 h-10 w-10 rounded-full flex items-center justify-center">
                <p className="text-white text-xs font-bold ">RN</p>
              </div>
              <div>
                <p className="text-sm font-bold">Raisa Nurdiana</p>
                <p className="text-xs text-manatee">
                  Frontend Engineer · Cakrawala Digital
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 rounded-lg border border-gray-300 p-5">
            <span className="text-4xl text-orange">"</span>
            <p className="text-sm">
              We used to manage event registrations over WhatsApp groups.
              Switching to EventHub as our organizer platform cut our admin
              overhead in half and attendance actually went up.
            </p>
            <div className="flex gap-3 items-center ">
              <div className="bg-green-700 h-10 w-10 rounded-full flex items-center justify-center">
                <p className="text-white text-xs font-bold ">BH</p>
              </div>
              <div>
                <p className="text-sm font-bold">Bimo Hartanto</p>
                <p className="text-xs text-manatee">
                  Product Manager · Nusantara Labs
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 rounded-lg border border-gray-300 p-5">
            <span className="text-4xl text-orange">"</span>
            <p className="text-sm">
              I love that I can filter by city and category in one place. Found
              a design sprint workshop in Bandung I never would have discovered
              otherwise — ended up being one of the best events I've attended.
            </p>
            <div className="flex gap-3 items-center ">
              <div className="bg-orange h-10 w-10 rounded-full flex items-center justify-center">
                <p className="text-white text-xs font-bold ">IK</p>
              </div>
              <div>
                <p className="text-sm font-bold">Indira Kusuma</p>
                <p className="text-xs text-manatee">
                  UX Designer · Aruna Kreasi Studio
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 px-4 lg:py-10 lg:px-13">
        <div className="rounded-2xl bg-black grid grid-cols-1 items-center justify-items-center text-center gap-4 px-6 py-12">
          <div className="flex gap-2">
            <span className="bg-blue-500/20 text-blue-400 text-xs font-medium px-3 py-1 rounded-full">
              Technology
            </span>
            <span className="bg-slate-500/20 text-slate-300 text-xs font-medium px-3 py-1 rounded-full">
              AI
            </span>
            <span className="bg-purple-500/20 text-purple-300 text-xs font-medium px-3 py-1 rounded-full">
              Design
            </span>
          </div>

          <h2 className="text-white text-2xl font-bold">
            Ready to find your community?
          </h2>

          <p className="text-manatee text-sm max-w-xs">
            Join thousands of developers, designers, and makers in Indonesia's
            most active tech communities.
          </p>

          <div className="grid w-4/5 lg:w-1/2  lg:flex lg:justify-center gap-3 mt-2 items-center justify-items-center">
            <button className="bg-orange w-3/4 lg:w-1/3 text-white text-sm font-semibold py-3 rounded-lg">
              Explore Events
            </button>
            <button className="border w-full lg:w-1/3 border-gray-700 text-gray-400 text-sm font-medium py-3 rounded-lg">
              Browse Communities
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Explore;
