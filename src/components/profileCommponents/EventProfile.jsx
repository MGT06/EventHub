
import PastEvent from "../myEventComponents/PastEvent";
import UpComingEvent from "../myEventComponents/UpComingEvent";

function EventProfile() {
  return (
    <>
      <section>
        <div>
          <p className="font-semibold text-sm mb-4 text-manatee">UPCOMING</p>
          <UpComingEvent />
        </div>
        <div className="mt-4">
          <p className="font-semibold text-sm mb-4 text-manatee">PAST</p>
          <PastEvent />
        </div>
      </section>
    </>
  );
}

export default EventProfile;
