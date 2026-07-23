async function fetchRecipe(prompt) {
    const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
    });
    return response.json();
}

export { fetchRecipe };
