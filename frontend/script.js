document.getElementById('input-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from reloading the page

    const urlToShorten = document.getElementById('hero-input').value;
    
    try {
        const response = await fetch('https://url-shortner-site.netlify.app/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: urlToShorten })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        document.getElementById('result').innerHTML =` <p>Shortened URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a></p>`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = `<p>Error shortening the URL</p>`;
    }
});

