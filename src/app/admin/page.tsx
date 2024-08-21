"use client";
import AdminLayout from "../layouts/adminLayout";
import TableComponent from "@/app/components/TableComponent";
import { useState, useEffect } from "react";
import type { SchoolClass } from "../interfaces/baseInterfaces";
import LoaderComponent from "../components/LoaderComponent";
import AddNewClassForSchool from "./AddNewClassForSchool";

function AdminPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [classesData, setClassesData] = useState<SchoolClass[]>([]);

  async function loadData() {
    const accessToken = localStorage.getItem("accessToken");
    const fetchClassesOfSchool = async () => {
      const response = await fetch(`http://localhost:3000/classes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setClassesData(data);
      setIsLoaded(true);
    };
    fetchClassesOfSchool();
  }

  useEffect(() => {
    loadData();
  }, []);
  if (!isLoaded) {
    return <LoaderComponent />;
  }
  return (
    <AdminLayout>
      <div className="container">
        <h1>Admin page</h1>
        <div className="table-container">
          <TableComponent
            data={classesData}
            tableName="Classes of school"
            AddItemModal={AddNewClassForSchool}
            headerList={["name", "grade", "specialty", "conductor_id"]}
          ></TableComponent>
        </div>
        <style jsx>{`
          .container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
          }
        `}</style>
      </div>
    </AdminLayout>
  );
}

export default AdminPage;
