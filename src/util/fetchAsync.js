const fetchAsync = async(queryString) => {
    const response = await fetch('https://radiant-garden-20014.herokuapp.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: queryString }),
    });
    return await response.json();
};

export default fetchAsync;