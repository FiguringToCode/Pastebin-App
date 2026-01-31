import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';

function PasteView() {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation()

  const initialUrlFromState = location.state?.url

  useEffect(() => {
    fetch(`https://pastebin-backend-fprz.onrender.com/api/pastes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Paste not found or unavailable');
        return res.json();
      })
      .then(setPaste)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  if (error || !paste) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Paste Not Found</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Create New Paste
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-5xl w-full">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Paste id :- {id}</h1>
          <div className="text-sm text-gray-500 space-y-1">
            {paste.remainingViews !== null && <p>Views left: {paste.remaining_views}</p>}
            {paste.expires_at && <p>Expires: {new Date(paste.expires_at).toLocaleString()}</p>}
          </div>
        </div>
        <p className="bg-blue-300 p-5 rounded-md text-sm text-center overflow-auto whitespace-pre-wrap">
          <Link to={initialUrlFromState}>Shared Link :- {initialUrlFromState}</Link>
        </p>
      </div>
    </div>
  );
}

export default PasteView;
