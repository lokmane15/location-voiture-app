export async function fetchCars() {
    const response = await fetch("http://127.0.0.1:8000/api/carsDispo")
    return response.json()
}