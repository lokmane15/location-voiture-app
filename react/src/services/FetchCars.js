const fetchCars = async (baseUrl, token) => {
    try {
        const response = await fetch(`${baseUrl}/carsDispo`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
            const jsonData = await response.json();
            return jsonData;
        }
        throw new Error('Failed to fetch cars');
    } catch (error) {
        console.error('Error fetching cars:', error);
        throw error;
    }
};

export default fetchCars;
