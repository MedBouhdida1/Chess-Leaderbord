import { useState, useEffect } from 'react';





//Custom hook for fetching data from API
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Une erreur s\'est produite lors de la récupération des données.');
                }

                const responseData = await response.json();
                setData(responseData);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }

        };

        fetchData();
    }, [url]);

    return { data, isLoading, error };
};

export default useFetch;
