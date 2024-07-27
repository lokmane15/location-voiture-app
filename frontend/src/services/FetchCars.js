const fetchCars = async (baseUrl) => {
    try {
        const response = await fetch(`${baseUrl}/carsDispo`, {
            method:"GET"
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