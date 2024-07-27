import { useState, useEffect } from "react";
import { User } from "../../lib/loginData";

export default function SetStudentDatasForm() {
  return (
    <div>
      <form>
        <label htmlFor="parent-tel-number">
          Telephone number of parent to set your parent:
        </label>
        <br />
        <input type="text" id="parent-tel-number" name="parent-tel-number" />
        <br />
        <label htmlFor="address">Address:</label>
        <br />
        <input type="text" id="address" name="address" />
      </form>
    </div>
  );
}
