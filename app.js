const apiKey = 'd72f3e0834msh44cf36ba529436cp1ba383jsn1109ba37c2e3';
const apiHost = 'tiktok-video-no-watermark2.p.rapidapi.com';

async function searchPosts() {
    const username = document.getElementById('searchInput').value.trim();
    if (!username) {
        alert("Please enter a TikTok username.");
        return;
    }

    const url = `https://tiktok-video-no-watermark2.p.rapidapi.com/user/posts?unique_id=${encodeURIComponent(username)}&count=20&cursor=0`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': apiHost
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('TikTok Posts:', result); // Log the fetched posts

        displayPosts(result.data.videos);
    } catch (error) {
        console.error('Error fetching TikTok posts:', error);
        alert(`Error fetching TikTok posts: ${error.message}`);
    }
}

function displayPosts(posts) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (posts && posts.length > 0) {
        posts.forEach(post => {
            // Debugging log for each post
            console.log('Post:', JSON.stringify(post, null, 2));

            // Access the video URL using the correct property
            const videoUrl = post.play; // The property that contains the video URL
            if (!videoUrl) {
                console.error('No video URL found for post:', JSON.stringify(post, null, 2));
                return;
            }

            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h3>${post.title || 'No Title'}</h3>
                <video controls>
                    <source src="${videoUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            resultsContainer.appendChild(postElement);
        });
    } else {
        resultsContainer.innerHTML = '<p>No posts found.</p>';
    }
}
