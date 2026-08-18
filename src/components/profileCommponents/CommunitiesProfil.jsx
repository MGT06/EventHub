import useJoin from "../../hooks/useJoin";
import dummy from "../../data/dummy.json";
import CardCommunities from "../cardComponents/CardCommunities";

function CommunitiesProfil() {
  const { list } = useJoin("joinedCommunities");

  const getDataCommunity = list.map((join) => {
    return dummy.communities.find((community) => community.id === join.id);
  });

  console.log(list)

  return (
    <>
      <section>
        <div>
          <div className="grid gap-4 lg:grid-cols-3">
            {getDataCommunity.map((community) => {
              return <CardCommunities key={community.id} community={community} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default CommunitiesProfil;
