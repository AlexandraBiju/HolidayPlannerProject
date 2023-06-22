import Navbar from "../../components/navbar/navbar";
import Backgroundc from "../../components/backgroundc";
import FamilyTable from "../../components/familyTable/familyTable";

function FamilyPage() {
  
  return (
    <>
      <div className="context">
        <Navbar />

        <FamilyTable  />
      </div>
      <Backgroundc />
    </>
  );
}

export default FamilyPage;
