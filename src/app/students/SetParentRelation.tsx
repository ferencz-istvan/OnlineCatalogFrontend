import { useState, useEffect } from "react";
import { User } from "../../lib/loginData";

function SetParentRelation() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAddedPhoneNumber, setIsAddedPhoneNumber] = useState(false);

  function handlePhoneNumber() {}
  return (
    <div>
      <form>
        <label htmlFor="parent-tel-number">
          Add telephone number of your parent to make a relation:
        </label>
        <br />
        <input
          type="text"
          id="parent-tel-number"
          name="parent-tel-number"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log(phoneNumber);
          }}
        >
          Search parent
        </button>
      </form>
    </div>
  );
}

export default SetParentRelation;
