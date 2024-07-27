async function fetchData() {
  try {
    const url = "http://localhost:3000/example";
    const method = "POST";
    const data = { foo: "bar", baz: "qux" };
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData()
  .then((responseData) => {
    console.log("Response data:", responseData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
