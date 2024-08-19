const fetchMarque = async (baseUrl)=>{
    try {
        const response = await fetch(`${baseUrl}/marquehhh`, {
            method:"GET",
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const jsonData = await response.json();
            return jsonData;
        }
        throw new Error('Failed to fetch marque');
    } catch (error) {
        console.error('Error fetching marque:', error);
        throw error;
    }
}
export default fetchMarque;