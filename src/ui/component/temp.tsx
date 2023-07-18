const [posts, setPosts] = useState(null);

useEffect(() => {
    (async () => {
        const data = await fetch('https://localhost:1111/api/posts', {
            credentials: 'include'
        });
        const response = await data.json();
        setPosts(response);
    })();
}, []);

if (posts === null) {
    return null;
}

return (
    <div>
        {posts.length > 0 ? (
            posts.map(post => (
                <Post key={post.id} onUpdate={() => handleUpdate()} post={post} />
            ))
        ) : (
            <p>No posts</p>
        )}
    </div>
);