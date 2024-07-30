export async function fetchCars() {
  const response = await fetch("http://127.0.0.1:8000/api/carsDispo");
  return response.json();
}
export async function fetchSingleCar(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/getCar/${id}`);
  return response.json();
}
export async function createCar(newCar) {
  const response = await fetch("http://127.0.0.1:8000/api/newcar", {
    method: "POST",
    // No need to set Content-Type manually here
    body: newCar,
  });

  // Check if the response is not OK
  if (!response.ok) {
    // Handle errors accordingly
    throw new Error("Network response was not ok");
  }

  return response.json();
}
export async function fetchupdateCar(updatedPost) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/updatecar/${updatedPost.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
export async function fetchDeleteCar(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/destroycar/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    console.log("the car was deleted successufly");
  }
}
export async function fetchUsers() {
  const response = await fetch("http://127.0.0.1:8000/api/users");
  return response.json();
}

export async function deleteUser(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/destroyUser/${id}`);
  if (response.ok) {
    console.log("deleted!!!");
  }
}
export async function updateData(data, id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/updatecar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Serialize data to JSON
    });

    if (response.ok) {
      console.log("The data updated successfully!");
    } else {
      console.log("There was an error updating the data.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
