import CardCommunities from "../cardComponents/CardCommunities";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";

function CommunitiesProfil() {
    const { userActive } = useAuth();
  
    const { dataCommunity } = useSelector(state => state.communityState)
  
    const community = dataCommunity.filter((ele) => ele.members?.includes(userActive.email))

  return (
    <>
      <section>
        <div>
          <div className="grid gap-4 lg:grid-cols-3">
            {community.map((community) => {
              return <CardCommunities key={community.id} community={community} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default CommunitiesProfil;
