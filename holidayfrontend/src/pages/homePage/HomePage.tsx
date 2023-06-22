import Backgroundc from "../../components/backgroundc";
import Navbar from "../../components/navbar/navbar";
import worldImage from "../../images/Urlaub.jpg";
import "../homePage/HomePage.css";

function HomePage() {
  return (
    <>
      <div className="area">
        <div className="context">
          <Navbar />
        </div>
        <p className="title">Welcome to my Holiday Family Planner</p>
        <img className="center" src={worldImage} alt={""} />
        <div className="centering">
          <div className="spacing">
            &bull;Creating unforgettable family memories requires careful
            planning and organization.
          </div>

          <div className="spacing">
            {" "}
            This is the ultimate tool to help families organize and plan their
            dream vacations together.
          </div>
          <div className="spacing">
            Make your family's dream vacation a reality with My Holiday Family
            Planner.
          </div>
          <div className="spacing40">
            <div className="spacing">
              {" "}
              &bull;Planning a family vacation can be overwhelming, but it
              doesn't have to be.
            </div>
            <div className="spacing">
              With the ability to change, delete and update family members,
              vacations and vacation wishes.{" "}
            </div>
            <div className="spacing">
              The app is easy to access and use. You've got additionally the
              potential to prioritise your holidays.
            </div>
          </div>
        </div>
        <Backgroundc />
      </div>
    </>
  );
}

export default HomePage;
