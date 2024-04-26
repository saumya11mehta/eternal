import Logo from '@/image/logo/Logo';
import React, { useState } from 'react';

const MakePosts = () => {
  const [postType, setPostType] = useState('music'); // Default to music type
  const [postContent, setPostContent] = useState('');

  const handlePostTypeChange = (type: React.SetStateAction<string>) => {
    setPostType(type);
  };

  const handlePostContentChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPostContent(e.target.value);
  };

  const handleShareClick = () => {
    // Implement logic to send the post to your backend
    // You can use postType and postContent for the post data
    // Reset the form or close the modal after posting
  };

  return (
    <>
      <div className="grid grid-cols-4 auto-rows-fr justify-center items-center rounded-3xl p-1 bg-gradient-to-r from-violet-600 to-purple-500 mb-2">
        <textarea
          value={postContent}
          onChange={handlePostContentChange}
          placeholder={`Share your ${postType}...`}
          rows={3}
          className="col-span-3 rounded-l-[calc(1.5rem-0.25rem)] bg-black p-2 focus:outline-none w-full resize-none"
        />
        <div className="flex rounded-r-[calc(1.5rem-0.25rem)] justify-center items-center bg-black rounded rounded-l-none border-0 px-4 font-bold h-full">
          <button onClick={handleShareClick} className="bg-purple-500 rounded-3xl text-white p-2 flex justify-center items-center">
            <Logo width="35" height="35"/>
          </button>
        </div>
      </div>
      
    </>
  );
};

export default MakePosts;