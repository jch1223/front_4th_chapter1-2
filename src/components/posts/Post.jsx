/** @jsx createVNode */
import { createVNode } from "../../lib";
import { globalStore } from "../../stores/globalStore.js";
import { toTimeFormat } from "../../utils/index.js";

export const Post = ({ id, author, time, content, likeUsers }) => {
  const { loggedIn, currentUser, posts } = globalStore.getState();

  const handleLikeClick = () => {
    if (!loggedIn) {
      alert("로그인 후 이용해주세요");
      return;
    }

    let newLikeUsers = [];
    if (!likeUsers.includes(currentUser.author)) {
      newLikeUsers = [...likeUsers, currentUser.author];
    } else {
      newLikeUsers = likeUsers.filter((user) => user !== currentUser.author);
    }

    globalStore.setState({
      posts: posts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            likeUsers: newLikeUsers,
          };
        }
        return post;
      }),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-center mb-2">
        <div>
          <div className="font-bold">{author}</div>
          <div className="text-gray-500 text-sm">{toTimeFormat(time)}</div>
        </div>
      </div>
      <p>{content}</p>
      <div className="mt-2 flex justify-between text-gray-500">
        <span
          className={`like-button cursor-pointer${likeUsers.length ? " text-blue-500" : ""}`}
          onClick={handleLikeClick}
        >
          좋아요 {likeUsers.length}
        </span>
        <span>댓글</span>
        <span>공유</span>
      </div>
    </div>
  );
};
