"use client";

import { useCounterStore } from "@/lib/store";
import { useStudentStore } from "@/lib/studentStore";
import { useUserPublicData } from "@/lib/loginData";
import CustomLayout from "../layouts/customLayout";
import { useEffect } from "react";
//import { stat } from "fs";

const logCount = () => {
  const count = useCounterStore.getState().count;
  console.log("count", count);
};

const setCount = () => {
  useCounterStore.setState({ count: 17 });
};

const logActualUser = () => {
  const user = useUserPublicData.getState().actual_user;
};

function OtherComponent({ count }: { count: number }): JSX.Element {
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const goBackZero = useCounterStore((state) => state.goBackZero);
  const incrementAsync = useCounterStore((state) => state.incrementAsync);
  const students = useStudentStore((state) => state.students);
  const getStudents = useStudentStore((state) => state.getSudents);
  useEffect(() => {
    setCount();
    logCount();
  }, []);
  return (
    <div>
      Count: {count}
      <div>
        <button onClick={increment}>Increment</button>
        <br />
        <button onClick={decrement}>Decrement</button>
        <br />
        <button onClick={goBackZero}>Go back to zero </button>
        <br />
        <button onClick={incrementAsync}>Increment async</button>
        <br />
        <button onClick={logActualUser}>Actual user</button>
        <br />
        <br />
        <div>
          {students.map((student) => (
            <div key={student.id}>
              <div>
                {student.name} ({student.class_id})
              </div>
              <div>address: {student.adress}</div>
            </div>
          ))}
        </div>
        <button onClick={getStudents}>Get students</button>
      </div>
    </div>
  );
}

function AboutPage() {
  const count = useCounterStore((state) => state.count);
  //or
  //const {count} = useCounterStore((state)=>state)
  return (
    <CustomLayout>
      <div className="container">
        <h1>About Us</h1>
        <p>This is the about page.</p>
        <OtherComponent count={count} />
        <img
          className="logo"
          src="https://static.vecteezy.com/system/resources/thumbnails/027/254/720/small_2x/colorful-ink-splash-on-transparent-background-png.png"
          alt="floating logo"
        />
      </div>
      <style jsx>
        {`
          .container {
            padding: 30px;
          }
          .logo {
            height: 40vmin;
            pointer-events: none;
          }

          @media (prefers-reduced-motion: no-preference) {
            .logo {
              animation: logo-float infinite 12s linear;
            }
          }

          @keyframes logo-float {
            0% {
              transform: translate(0, 0);
            }
            25% {
              transform: translate(2vw, -50vh);
            }
            50% {
              transform: translate(20vw, -10vh);
            }
            75% {
              transform: translate(10vw, -3vh);
            }
            100% {
              transform: translate(0vw, 0vh);
            }
          }
        `}
      </style>
    </CustomLayout>
  );
}

export default AboutPage;
