const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchCars() {
  const response = await fetch(`${apiUrl}/cars`);
  return response.json();
}

//car disponible

export async function getDisponibleCars() {
  const response = await fetch(`${apiUrl}/carsDispo`);
  return response.json();
}

export async function getCarsNotDisponible() {
  const response = await fetch(`${apiUrl}/carsNotDispo`);
  return response.json();
}

export async function fetchSingleCar(id) {
  const response = await fetch(`${apiUrl}/getCar/${id}`);
  return response.json();
}
export async function fetchCreateCar({ data, token }) {
  try {
    const response = await fetch(`${apiUrl}/newcar`, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log("The data created successfully!");
    } else {
      const errorData = await response.json();
      console.log("There was an error creating the data:", errorData);
    }
  } catch (error) {
    console.error("Network or server error:", error);
  }
}
export async function fetchupdateCar({ formData, id, token }) {
  try {
    const response = await fetch(`${apiUrl}/updatecar/${id}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      console.log("The data updated successfully!");
    } else {
      console.error("There was an error updating the data.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
export async function fetchDeleteCar(id, token) {
  const response = await fetch(`${apiUrl}/destroycar/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    console.log("the car was deleted successufly");
  }
}
export async function fetchUsers(token) {
  const response = await fetch(`${apiUrl}/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}
export async function fetchSingleUser({ id, token }) {
  const response = await fetch(`${apiUrl}/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function deleteUser(id, token) {
  const response = await fetch(`${apiUrl}/destroyUser/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    console.log("deleted!!!");
  }
}

//marque
export async function fetchMarque(token) {
  const response = await fetch(`${apiUrl}/marque`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}
export async function fetchSingleMarque({ id, token }) {
  const response = await fetch(`${apiUrl}/onemarque/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}
export async function createMarque({ formData, token }) {
  try {
    const response = await fetch(`${apiUrl}/createmarque`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log("The data created successfully!");
    } else {
      const errorData = await response.json();
      console.log("There was an error creating the data:", errorData);
    }
  } catch (error) {
    console.error("Network or server error:", error);
  }
}
export async function updateMarque({ formData, id, token }) {
  try {
    const response = await fetch(`${apiUrl}/marque/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
export async function deleteMarque(id, token) {
  const response = await fetch(`${apiUrl}/marque/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    console.log("deleted!!!");
  }
}

//the models
export async function fetchModel(token) {
  const response = await fetch(`${apiUrl}/models`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch models");
  }

  return await response.json();
}
export async function fetchSingleModel({ id, token }) {
  const response = await fetch(`${apiUrl}/models/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function CreateModel({ data, token }) {
  const response = await fetch(`${apiUrl}/models`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    console.log("the model created!!");
  } else {
    console.log("not working :(");
  }
}
export async function DeleteModel(id, token) {
  const response = await fetch(`${apiUrl}/models/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}
export async function fetchUpdateModel({ data, id, token }) {
  const response = await fetch(`${apiUrl}/models/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

//reservation

export async function fetchReservation(token) {
  const response = await fetch(`${apiUrl}/reservation`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

//fetch model by the marque id

export async function fetchmodelbymarqueid(id) {
  const response = await fetch(`${apiUrl}/modelByMarqueid/${id}`);
  return response.json();
}
//stripe balance
export async function getBalance() {
  const response = await fetch(`${apiUrl}/earnings`);
  return response.json();
}
export async function getEarningstoday() {
  const response = await fetch(`${apiUrl}/todays-payments`);
  return response.json();
}

//admin login

export async function adminlogin(username, password) {
  const response = await fetch(`${apiUrl}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
}
export async function adminlogout(token) {
  const response = await fetch(`${apiUrl}/admin/logout`, {
    method: "POST", // Specify the HTTP method
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}
