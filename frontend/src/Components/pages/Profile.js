// import './App.css';
import React, { useState } from "react";

const Profile = () => {
  const [ownerFirstName, setOwnerFirstName] = useState("");
  const [ownerLastName, setOwnerLastName] = useState("");
  const [ownerDisplayName, setOwnerDisplayName] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [ownerCity, setOwnerCity] = useState("");
  const [ownerState, setOwnerState] = useState("");
  const [ownerZip, setOwnerZip] = useState("00000");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogAge, setDogAge] = useState(0);
  const [dogGender, setDogGender] = useState("male");
  const [dogColor, setDogColor] = useState("");
  const [dogBirthdate, setDogBirthdate] = useState("");
  const [dogAllergies, setDogAllergies] = useState("");
  const [dogWeight, setDogWeight] = useState("");
  const [dogFriendly, setDogFriendly] = useState("yes");
  const [amtWalks, setAmtWalks] = useState("");
  const [amtMeals, setAmtMeals] = useState("");
  const [amtPerMeal, setAmtPerMeal] = useState("");
  const [dogPottyTrained, setDogPottyTrained] = useState("yes");
  const [dogFixed, setDogFixed] = useState("yes");

  const handleSubmit = () => {
    console.log(`The owner's first name is ${ownerFirstName}.`);
  };

  console.log("doggender :: ", dogGender);

  return (
    <div className="App">
      <h1>Owner Information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={ownerFirstName}
            onChange={(event) => {
              setOwnerFirstName(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={ownerLastName}
            onChange={(event) => {
              setOwnerLastName(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Display Name (this will be displayed in blog posts)</label>
          <input
            type="text"
            name="displayName"
            value={ownerDisplayName}
            onChange={(event) => {
              setOwnerDisplayName(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Street Address</label>
          <input
            type="text"
            name="ownerAddress"
            value={ownerAddress}
            onChange={(event) => {
              setOwnerAddress(event.target.value);
            }}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="ownerCity"
            value={ownerCity}
            onChange={(event) => {
              setOwnerCity(event.target.value);
            }}
          />
        </div>
        <div>
          <label>State</label>
          <input
            type="text"
            name="ownerState"
            value={ownerState}
            onChange={(event) => {
              setOwnerState(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Zip Code</label>
          <input
            type="text"
            name="ownerZip"
            value={ownerZip}
            onChange={(event) => {
              setOwnerZip(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Email Address</label>
          <input
            type="text"
            name="ownerEmail"
            value={ownerEmail}
            onChange={(event) => {
              setOwnerEmail(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="ownerPhone"
            value={ownerPhone}
            onChange={(event) => {
              setOwnerPhone(event.target.value);
            }}
          />
        </div>
        <h1>Dog Information</h1>
        <div>
          <label>Dog's Name</label>
          <input
            type="text"
            name="dogName"
            value={dogName}
            onChange={(event) => {
              setDogName(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Dog Breed</label>
          <input
            type="text"
            name="dogBreed"
            value={dogBreed}
            onChange={(event) => {
              setDogBreed(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Dog Age (years)</label>
          <input
            type="text"
            name="dogAge"
            value={dogAge}
            onChange={(event) => {
              setDogAge(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Dog Gender</label>
          <label>
            <input
              type="radio"
              value="male"
              checked={dogGender === "male"}
              onChange={(event) => {
                setDogGender(event.target.value);
              }}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="female"
              checked={dogGender === "female"}
              onChange={(event) => {
                setDogGender(event.target.value);
              }}
            />
            Female
          </label>
        </div>
        <div>
          <label>Dog Color</label>
          <input
            type="text"
            name="dogColor"
            value={dogColor}
            onChange={(event) => {
              setDogColor(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Dog Birthdate (mm/dd)</label>
          <input
            type="text"
            name="dogBirthdate"
            value={dogBirthdate}
            onChange={(event) => {
              setDogBirthdate(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Dog Allergies (if none, enter "n/a")</label>
          <input
            type="text"
            name="dogAllergies"
            value={dogAllergies}
            onChange={(event) => {
              setDogAllergies(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Dog Weight (lbs)</label>
          <input
            type="text"
            name="dogWeight"
            value={dogWeight}
            onChange={(event) => {
              setDogWeight(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Dog Friendly? </label>
          <label>
            <input
              type="radio"
              value="yes"
              checked={dogFriendly === "yes"}
              onChange={(event) => {
                setDogFriendly(event.target.value);
              }}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="no"
              checked={dogFriendly === "no"}
              onChange={(event) => {
                setDogFriendly(event.target.value);
              }}
            />
            No
          </label>
          <label>
            <input
              type="radio"
              value="unknown"
              checked={dogFriendly === "unknown"}
              onChange={(event) => {
                setDogFriendly(event.target.value);
              }}
            />
            Unknown
          </label>
        </div>
        <div>
          <label>Amount of Walks Per Day</label>
          <input
            type="text"
            name=""
            value={amtWalks}
            onChange={(event) => {
              setAmtWalks(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Amount of Meals Per Day</label>
          <input
            type="text"
            name="dogAllergies"
            value={amtMeals}
            onChange={(event) => {
              setAmtMeals(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Amount of Food per Meal (cups)</label>
          <input
            type="text"
            name="dogAllergies"
            value={amtPerMeal}
            onChange={(event) => {
              setAmtPerMeal(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Dog Potty Trained?</label>
          <label>
            <input
              type="radio"
              value="yes"
              checked={dogPottyTrained === "yes"}
              onChange={(event) => {
                setDogPottyTrained(event.target.value);
              }}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="no"
              checked={dogPottyTrained === "no"}
              onChange={(event) => {
                setDogPottyTrained(event.target.value);
              }}
            />
            No
          </label>
        </div>
        <div>
          <label>Dog Fixed?</label>
          <label>
            <input
              type="radio"
              value="yes"
              checked={dogFixed === "yes"}
              onChange={(event) => {
                setDogFixed(event.target.value);
              }}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="no"
              checked={dogFixed === "no"}
              onChange={(event) => {
                setDogFixed(event.target.value);
              }}
            />
            No
          </label>
          <label>
            <input
              type="radio"
              value="not applicable"
              checked={dogFixed === "not applicable"}
              onChange={(event) => {
                setDogFixed(event.target.value);
              }}
            />
            Not Applicable
          </label>
        </div>

        <button type="submit">Complete Profile</button>
      </form>
    </div>
  );
};

export default Profile;

// function App()
// {
//     return (
//     <div className="App">
//         <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
