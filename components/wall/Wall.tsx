'use client'

import { useState, useEffect } from 'react';
import MakePosts from './MakePosts';
import Posts from './Posts';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Wall() {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    // Function to fetch more posts
    const fetchMorePosts = () => {
        // Implement your logic to fetch more posts here
        // Update the 'posts' state with the new posts
        // Set 'hasMore' to false when there are no more posts to fetch
    };
    
    useEffect(() => {
        // Initial data fetching logic
        fetchMorePosts();
    }, []);
    
    //   const handlePostSubmit = (postData) => {
    //     // Handle the submission of the post data
    //     // Update the posts array with the new post
    //   };

    return (
        <section className="flex flex-col">
            <div className="flex flex-col bg-gray-900 border border-gray-900 rounded-t-md p-5 mx-5 mt-5 border-b-2">
                <MakePosts/>
                {(posts.length > 0)  && <InfiniteScroll
                dataLength={posts.length}
                next={fetchMorePosts}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                >
                    <Posts posts={posts} />
                </InfiniteScroll>}
            </div>
        </section>
    );
}