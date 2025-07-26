import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error('Error fetching post detail:', err));
  }, [id]);

  if (!post) return <p style={{ textAlign: 'center' }}>Loading...</p>;

  return (
    <div className="detail-container">
      <h2>{post.title}</h2>
      <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} />
      <p><strong>Location:</strong> {post.location}</p>
      <p><strong>Category:</strong> {post.category}</p>
      <p><strong>Budget:</strong> £{post.budget}</p>
      <p><strong>Author:</strong> {post.author}</p>
      <p className="itinerary"><strong>Itinerary / Experience:</strong><br />{post.itinerary}</p>
    </div>
  );
};

export default PostDetail;
