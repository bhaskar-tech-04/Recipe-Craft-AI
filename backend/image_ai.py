import urllib.parse

def generate_image(prompt: str) -> str:
    """Stub for image generation. Returns a placeholder URL based on the prompt."""
    title = 'Recipe+Image'
    if prompt:
        title = urllib.parse.quote_plus(prompt[:50])
    return f'https://via.placeholder.com/800x600?text={title}'
