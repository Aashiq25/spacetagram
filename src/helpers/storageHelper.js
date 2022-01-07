export const getLikedPosts = () => {
    if (typeof window !== undefined) {
        const data = localStorage.getItem('likedPosts')
        return data ? JSON.parse(data) : []
    }
    return {}
}
export const setLikedPosts = (value) => {
    if (typeof window !== undefined) {
        localStorage.setItem('likedPosts', JSON.stringify(value))
    }
}
