"use client";

import DashboardHeader from "./Header";
import SideBar from "./SideBar";
import { useState } from "react";

export default function Dashboard() {
  const [isNavbar, setIsNavbar] = useState(false);
  function handleNavbar() {
    setIsNavbar((prev) => !prev);
  }

  return (
    <div className="dashboardView">
      <DashboardHeader handleNavbar={handleNavbar} />
      <SideBar isNavbar={isNavbar} handleNavbar={handleNavbar} />
      <div className="dashboard-container">
        <h1>hali</h1>
        <p>hihi</p>
        <br />
        <p>én vagyok </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi
          repellat nesciunt eius et! Nam fuga aspernatur molestiae repellendus,
          earum quidem odit deleniti voluptatibus, obcaecati neque vero ullam
          asperiores dolore similique architecto aut a magni maxime! Iure unde
          magni, laborum possimus alias nemo accusamus! Dolorum ullam minima et,
          ex delectus inventore, molestiae deleniti recusandae vel nobis earum
          eligendi illo necessitatibus similique.
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat nam
          expedita repellendus odit rerum dolorem omnis neque quisquam, amet
          eius pariatur quae suscipit minima reprehenderit recusandae est? Quos
          vero repellat possimus assumenda quidem esse, incidunt ipsum
          perspiciatis. Unde, placeat accusamus!
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          libero aut vitae enim consequatur sed modi quo minus, laudantium,
          animi aliquid provident accusantium repellat exercitationem facilis
          qui quibusdam sequi impedit accusamus voluptatibus commodi! Iure
          molestias eaque porro adipisci officia itaque?
        </p>
      </div>
      <p>huh</p>

      <style jsx>
        {`
          .dashboardView {
            background-color: aliceblue;
            min-height: 100vh;
          }
          .dashboard-container {
            background-color: green;
            width: 20%;
            margin: 350px;
            padding: 20px;
          }
        `}
      </style>
    </div>
  );
}
