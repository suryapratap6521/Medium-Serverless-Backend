import { Button, TextField } from "@mui/material";
import { Appbar } from "../Components/Appbar";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [published,setPublished]=useState(true);
  const navigate=useNavigate();

  const handlePublish = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/createblog`,
        { title, content,published },
        { headers }
      );

      if (response.status === 200) {
        setTitle("");
        setContent("");
        setSuccess(true);
        navigate('/blogs');
        
      } else {
        setError("Failed to publish the blog.");
      }
    } catch (error) {
      setError("An error occurred while publishing the blog.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Appbar />
      <div className="max-w-lg mx-auto mt-8 p-4 border rounded shadow-md">
        <h2 className="text-2xl mb-4">Publish a New Blog</h2>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4"
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          required
          rows={6}

          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-4"
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-500 mb-2">Blog published successfully!</div>}
        <Button
          variant="contained"
          color="primary"
          onClick={handlePublish}
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish"}
        </Button>
      </div>
    </div>
  );
};
