import Navbar from "../../components/navbar/navbar";
import Backgroundc from "../../components/backgroundc";
import HolidayTable from "../../components/holidayTable/holidayTable";

function HolidayPage() {
  
  return (
    <>
      <div className="context">
        <Navbar />

        <HolidayTable  />
      </div>
      <Backgroundc />
    </>
  );
}

export default HolidayPage;
