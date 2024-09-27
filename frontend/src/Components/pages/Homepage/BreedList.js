import { useState } from "react";
import "./BreedList.css";

const BreedList = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBreed, setNewBreed] = useState("");

  if (!props.breeds || !props.breeds.data) {
    return <p>Loading...</p>;
  }

  const handleDelete = (breed) => {
    console.log("breed", breed, "breed.breedid", breed.breedid);
    fetch("/api/breeds/" + breed.breedid, {
      method: "DELETE",
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting breed:", error);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const enteredBreed = { breed: event.target.value };
      fetch("/api/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enteredBreed),
      })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error adding breed:", error);
        });
      event.target.value = "";
    }
  };

  const updateBreed = (breedid, updatedbreed) => {
    fetch("/api/breeds/" + breedid, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ breed: updatedbreed }),
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error updating breed:", error);
      });
  };

  const listItems = props.breeds.data.map((breed) => (
    <li key={breed.breedid}>
      {isEditing ? (
        <>
          <input
            type="text"
            onChange={(e) => {
              setNewBreed(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateBreed(breed.breedid, newBreed);
              }
            }}
          />
        </>
      ) : (
        <>
          {breed.breed}
          <button className="deleteButton" onClick={() => handleDelete(breed)}>
            <i className="bi bi-trash"></i>
          </button>
          <button className="updateButton" onClick={() => setIsEditing(true)}>
            <i className="bi bi-pencil"></i>
          </button>
        </>
      )}
    </li>
  ));

  return (
    <div className="breed_list">
      <p>Enter your favorite dog breed!</p>
      <input onKeyDown={handleKeyDown} type="text" />
      <ul className="breeds"> {listItems}</ul>
    </div>
  );
};

export default BreedList;
