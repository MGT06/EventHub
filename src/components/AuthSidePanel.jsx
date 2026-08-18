import dina from "../assets/dina.jpg";
import kevin from "../assets/kevin.jpg";

function AuthSidePanel() {
  return (
    <article className="hidden lg:flex flex-col gap-10 w-1/3 py-10 px-11 bg-black">
      <div>
        <span className="bg-orange rounded-xl px-4 py-2 mr-2 text-white font-bold">
          E
        </span>
        <h1 className="inline-block font-bold text-lg text-white">Event Hub</h1>
      </div>
      <div className="grid gap-4">
        <h2 className="text-white font-bold text-3xl">
          Discover events that shape careers.
        </h2>
        <p className="text-sm text-manatee">
          Workshops, conferences, and community meetups from Indonesia's most
          active tech communities — all in one place.
        </p>
        <div className="grid gap-3">
          <div className="p-4 rounded-2xl bg-[#ffffff25]">
            <p className="text-grey text-xs text-manatee">
              "Found my last three workshops here. The community is fantastic."
            </p>
            <div className="flex gap-3 mt-3">
              <img src={dina} alt="" className="w-7 h-7 rounded-full" />
              <div>
                <p className="font-semibold text-xs text-white">Dina Rahayu</p>
                <p className="text-[11px] text-manatee">
                  Backend Lead, Cakrawala Digital
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#ffffff25]">
            <p className="text-grey text-xs text-manatee">
              "EventHub is where Jakarta's tech scene actually happens."
            </p>
            <div className="flex gap-3 mt-3">
              <img src={kevin} alt="" className="w-7 h-7 rounded-full" />
              <div>
                <p className="font-semibold text-xs text-white">
                  Kevin Santoso
                </p>
                <p className="text-[11px] text-manatee">
                  ML Engineer, Nusantara Labs
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <div>
            <span className="text-white font-bold text-xl ">12k+</span>
            <p className="text-manatee text-xs">Members</p>
          </div>
          <div>
            <span className="text-white font-bold text-xl ">200+</span>
            <p className="text-manatee text-xs">Event/year</p>
          </div>
          <div>
            <span className="text-white font-bold text-xl ">50+</span>
            <p className="text-manatee text-xs">Communities</p>
          </div>
        </div>
      </div>
      <p className="text-manatee text-xs mt-auto ">
        © 2026 EventHub · Indonesia
      </p>
    </article>
  );
}

export default AuthSidePanel;
