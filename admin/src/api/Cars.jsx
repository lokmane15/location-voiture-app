export async function fetchCars() {
  const response = await fetch("http://127.0.0.1:8000/api/cars");
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
export async function fetchupdateCar(updatedPost, id) {
  const response = await fetch(`http://127.0.0.1:8000/api/updatecar/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedPost),
  });

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
export async function fetchSingleUser(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/user/${id}`);
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
//marque
export async function fetchMarque() {
  const response = await fetch("http://127.0.0.1:8000/api/marque");
  return response.json();
}
export async function fetchSingleMarque(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/onemarque/${id}`);
  return response.json();
}

export async function createMarque(data) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/createmarque", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log("The data created successfully!");
    } else {
      console.log("There was an error creating the data.");
    }
  } catch (error) {
    console.log(error);
  }
}
//   const updateMarque = async (id) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/api/marque/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(marque),
//       });

//       if (response.ok) {
//         console.log("The data updated successfully!");
//         navigate("/marque");
//       } else {
//         console.log("There was an error updating the data.");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   };

export async function deleteMarque(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/marque/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    console.log("deleted!!!");
  }
}

//the models
export async function fetchModel() {
  const response = await fetch("http://127.0.0.1:8000/api/models");
  return response.json();
}
export async function fetchSingleModel(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/models/${id}`);
  return response.json();
}

export async function CreateModel(data) {
  const response = await fetch("http://127.0.0.1:8000/api/models", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    console.log("the model created!!");
  } else {
    console.log("not working :(");
  }
}
export async function DeleteModel(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/models/${id}`, {
    method: "DELETE",
  });
  return response.json();
}
export async function fetchUpdateModel(data, id) {
  const response = await fetch(`http://127.0.0.1:8000/api/models/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

//reservation

export async function fetchReservation() {
  const response = await fetch("http://127.0.0.1:8000/api/reservation");
  return response.json();
}

//fetch model by the marque id

export async function fetchmodelbymarqueid(id) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/modelByMarqueid/${id}`
  );
  return response.json();
}
