import Navbar from "../../components/navbar/navbar";
import Backgroundc from "../../components/backgroundc";
import WishTable from "../../components/wishTable/wishTable";

function WishPage() {
  
  return (
    <>
      <div className="context">
        <Navbar />

        <WishTable  />
      </div>
      <Backgroundc />
    </>
  );
}

export default WishPage;
