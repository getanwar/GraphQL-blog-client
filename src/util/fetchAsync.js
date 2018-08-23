const fetchAsync = async(queryString) => {
    // const url = 'http://localhost:8080/graphql';
    const url = 'https://radiant-garden-20014.herokuapp.com/graphql';
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ query: queryString }),
        headers: { 
            'Accept':  'application/json',
            'Content-Type': 'application/json' 
        },
    });
    return await response.json();
};

export default fetchAsync;