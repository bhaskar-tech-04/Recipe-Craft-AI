document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', () => {
            window.location.href = 'recipe.html';
        });
    }

    const recipeForm = document.getElementById('recipeForm');
    const decreaseBtn = document.getElementById('decreaseServings');
    const increaseBtn = document.getElementById('increaseServings');
    const servingsInput = document.getElementById('servings');

    if (decreaseBtn && increaseBtn && servingsInput) {
        decreaseBtn.addEventListener('click', () => updateServings(-1));
        increaseBtn.addEventListener('click', () => updateServings(1));
    }

    if (recipeForm) {
        recipeForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const ingredients = document.getElementById('prompt').value.trim();
            const cuisine = document.getElementById('cuisine')?.value || '';
            const diet = document.getElementById('diet')?.value || '';
            const cookingTime = document.querySelector('input[name="time"]:checked')?.value || '';
            const spiceLevel = document.querySelector('input[name="spice"]:checked')?.value || '';
            const details = document.getElementById('details')?.value.trim() || '';
            const servings = document.getElementById('servings')?.value.trim() || '2';

            if (!ingredients) {
                showMessage('Please type your ingredients to generate a recipe.', true);
                return;
            }

            const promptParts = [
                `Ingredients: ${ingredients}`,
                cuisine && `Cuisine: ${cuisine}`,
                diet && `Diet: ${diet}`,
                cookingTime && `Cooking time: ${cookingTime}`,
                spiceLevel && `Spice level: ${spiceLevel}`,
                servings && `Servings: ${servings}`,
                details && `Extra instructions: ${details}`
            ].filter(Boolean);

            setLoading(true);
            try {
                const result = await generateRecipe(promptParts.join(' | '));
                renderRecipe(result);
            } catch (error) {
                showMessage('Unable to generate recipe. Try again in a moment.', true);
            } finally {
                setLoading(false);
            }
        });
    }
});

async function generateRecipe(prompt) {
    const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
    });
    if (!response.ok) {
        throw new Error('Request failed');
    }
    return response.json();
}

function updateServings(change) {
    const input = document.getElementById('servings');
    if (!input) return;
    const current = Number(input.value || 1);
    const next = Math.max(1, current + change);
    input.value = next;
}

function setLoading(isLoading) {
    const container = document.getElementById('recipeResult');
    if (!container) return;
    if (isLoading) {
        container.innerHTML = `
            <div class="loading-card">
                <div class="spinner"></div>
                <div>
                    <h2>Cooking up your recipe...</h2>
                    <p>AI is generating your meal plan and instructions.</p>
                </div>
            </div>
        `;
    }
}

function showMessage(message, isError = false) {
    const container = document.getElementById('recipeResult');
    if (!container) return;
    container.innerHTML = `
        <div class="empty-state">
            <h2>${isError ? 'Oops!' : 'Note'}</h2>
            <p>${message}</p>
        </div>
    `;
}

function renderRecipe(recipe) {
    const container = document.getElementById('recipeResult');
    if (!container || !recipe) {
        showMessage('No recipe data available.', true);
        return;
    }

    const nutritionItems = Object.entries(recipe.nutrition || {}).map(
        ([key, value]) => `<span>${key.replace(/_/g, ' ')}: <strong>${value}</strong></span>`
    ).join(' · ');

    container.innerHTML = `
        <div class="recipe-card">
            <img src="${recipe.image_url}" alt="${recipe.title}" />
            <div class="recipe-summary">
                <h2>${recipe.title}</h2>
                <div class="recipe-meta">${nutritionItems}</div>
                <p>${recipe.notes || 'A delicious recipe generated just for you.'}</p>
            </div>
            <div class="recipe-section">
                <h3>Ingredients</h3>
                <ul>${recipe.ingredients.map(item => `<li>${item}</li>`).join('')}</ul>
            </div>
            <div class="recipe-section">
                <h3>Instructions</h3>
                <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
            </div>
        </div>
    `;
}
