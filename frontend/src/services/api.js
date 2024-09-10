const apiUrl = import.meta.env.VITE_API_URL;

//fetch all the cars
export const fetchCars = async () => {
    
    try {
        const response = await fetch(`${apiUrl}/carsDispo`, {
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

//fetch single car

export const fetchCarId = async (id, token) => {
    try {
        const response = await fetch(`${apiUrl}/car/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
            const jsonData = await response.json();
            return jsonData;
        }else if(response.status === 401){
            localStorage.removeItem("user");
            location.reload();
        }
        throw new Error('Failed to fetch cars');
    } catch (error) {
        console.error('Error fetching cars:', error);
        throw error;
    }
};

//fetch all the marque

export const fetchMarque = async ()=>{
    try {
        const response = await fetch(`${apiUrl}/marque`, {
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

//fetch Contract

export const fetchContract = async (token) =>{
    try {
        const response = await fetch(`${apiUrl}/getContrat`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const jsonData = await response.json();
            return jsonData;
        } else if(response.status === 401) {
            localStorage.removeItem('user')
            location.reload()
        } else {
            console.error('Failed to fetch contract data');
        }
    } catch (error) {
        console.error('Error fetching contract data:', error);
    }
}