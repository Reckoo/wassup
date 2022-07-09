import React from "react";
import PostCard from "./PostCard";

function Feed({ posts }) {
  return (
    <div className="grid place-content-center gap-4">
        {/* Rendering the posts using map */}
      {posts.map((p) => (
        //Sending props value to the PostCard component and rendering them on the feed
        <PostCard
          userEmail={p.userEmail}
          id={p._id}
          key={p._id}
          userName={p.userName}
          userPhotoUrl={p.userPhotoUrl}
          Postaddress={p.postAddress}
          postUrl={p.postUrl}
          postDesc={p.postDesc}
        />
      ))}
    </div>
  );
}

export default Feed;
