export const loadPosts = async () => {
    const postsResponde = fetch('https://jsonplaceholder.typicode.com/posts');

    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')
  
    const [posts, photos] = await Promise.all([postsResponde, photosResponse])

    const photosJson = await photos.json()

    const postsJson = await posts.json()

    const postsAndPhotos = postsJson.map((post, index) => {
        return {...post, cover: photosJson[index].url}  
    })

    return postsAndPhotos
}