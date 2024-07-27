const fetchCarId = async (baseUrl,id, token) => {
    try {
        const response = await fetch(`${baseUrl}/car/${id}`, {
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

export default fetchCarId;