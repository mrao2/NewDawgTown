import useFetch from "../../useFetch";
import "./Homepage.css";
import BreedList from "./BreedList";

function Homepage() {
  const project = {
    title: "Newtown Dogs Pet Sitting",
  };

  const { data: breeds, isPending, error } = useFetch("/api/home");

  return (
    <div className="homepage">
      {error && <div>{error}</div>}
      {isPending && <div>Loading... </div>}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1 className="title">{project.title}</h1>
      <p>Located at 4811 Delmar Blvd, St. Louis, MO 63108</p>
      <p>Phone number: 555-444-1234</p>
      <br />

      <BreedList className="breeds" breeds={breeds} />
    </div>
  );
}

export default Homepage;
