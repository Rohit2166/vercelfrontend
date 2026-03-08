import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import API from '../config/api';

const EditTurf = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: '',
    sport: 'cricket',
    price: '',
    description: '',
    images: []
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentImages, setCurrentImages] = useState([]);
  const [preview, setPreview] = useState([]);

  // Fetch ground details on mount
  useEffect(() => {
    const fetchGround = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API}/api/grounds/${id}`);
        if (!response.ok) throw new Error('Failed to fetch ground');
        const data = await response.json();
        
        setFormData({
          name: data.name,
          location: data.location,
          address: data.address,
          sport: data.sport,
          price: data.price,
          description: data.description || '',
          images: []
        });
        setCurrentImages(data.images || (data.image ? [data.image] : []));
      } catch {
        setError('Failed to load turf details');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchGround();
  }, [id]);

  if (!user || user.role !== 'owner') {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">Only owners can edit turfs</p>
          <button
            onClick={() => navigate('/')}
            className="bg-green-500 px-6 py-2 rounded hover:bg-green-600"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5); // Limit to 5 images
    
    if (files.length === 0) return;
    
    // Resize and convert to base64 with aggressive compression
    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            // Resize to max 400px - much smaller for faster upload
            const maxSize = 400;
            let width = img.width;
            let height = img.height;
            
            // Calculate new dimensions
            if (width > height) {
              if (width > maxSize) {
                height = (height * maxSize) / width;
                width = maxSize;
              }
            } else {
              if (height > maxSize) {
                width = (width * maxSize) / height;
                height = maxSize;
              }
            }
            
            // Create canvas and resize
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            // Compress to JPEG with 0.5 quality - 50% quality for smaller size
            const resizedBase64 = canvas.toDataURL('image/jpeg', 0.5);
            resolve(resizedBase64);
          };
          img.onerror = reject;
          img.src = event.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    
    Promise.all(promises).then(base64Images => {
      setFormData({
        ...formData,
        images: [...formData.images, ...base64Images]
      });
      // Create preview URLs
      const newPreviews = base64Images.map(src => src);
      setPreview([...preview, ...newPreviews]);
    });
  };

  const removeCurrentImage = (index) => {
    const newImages = currentImages.filter((_, i) => i !== index);
    setCurrentImages(newImages);
  };

  const removeNewImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreview = preview.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
    setPreview(newPreview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      // Prepare all images - keep current images that weren't removed + new base64 images
      const allImages = [...currentImages, ...formData.images];

      // Send as JSON with base64 images
      const payload = {
        name: formData.name,
        location: formData.location,
        address: formData.address,
        sport: formData.sport,
        price: formData.price,
        description: formData.description,
        images: allImages
      };

      const apiUrl = API.replace(/\/$/, '');
      const response = await fetch(`${apiUrl}/api/grounds/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update turf');
      }

      setSuccess('Turf updated successfully!');

      setTimeout(() => {
        navigate('/owner/dashboard');
      }, 1500);

    } catch (err) {
      setError(err.message || 'Failed to update turf');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Edit Turf</h1>

        {error && (
          <div className="bg-red-500 p-4 rounded mb-6 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500 p-4 rounded mb-6 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg space-y-6">
          
          <div>
            <label className="block text-lg font-semibold mb-2">Turf Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 p-3 rounded text-white focus:outline-none focus:border-green-500"
              placeholder="e.g., Royal Cricket Ground"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-semibold mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 p-3 rounded text-white focus:outline-none focus:border-green-500"
                placeholder="e.g., Mansarovar"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">Sport Type</label>
              <select
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 p-3 rounded text-white focus:outline-none focus:border-green-500"
              >
                <option value="cricket">Cricket</option>
                <option value="badminton">Badminton</option>
                <option value="basketball">Basketball</option>
                <option value="pickleball">Pickleball</option>
                <option value="tennis">Tennis</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 p-3 rounded text-white focus:outline-none focus:border-green-500"
              placeholder="Full address"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Price (per hour in ₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 p-3 rounded text-white focus:outline-none focus:border-green-500"
              placeholder="e.g., 500"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 p-3 rounded text-white focus:outline-none focus:border-green-500"
              placeholder="Describe your turf facilities and amenities"
              rows="4"
            />
          </div>

          {currentImages.length > 0 && (
            <div>
              <label className="block text-lg font-semibold mb-2">Current Images ({currentImages.length})</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {currentImages.map((img, index) => {
                  // Helper to get the correct image URL
                  const getImageUrl = (image) => {
                    if (!image) return "/image-wm.png";
                    if (image.startsWith('http://') || image.startsWith('https://')) {
                      return image;
                    }
                    return `${API}/uploads/${image}`;
                  };
                  return (
                    <div key={index} className="relative">
                      <img 
                        src={getImageUrl(img)}
                        alt={`Current ${index + 1}`}
                        className="w-full h-32 object-cover rounded"
                        onError={(e) => { e.target.src = '/image-wm.png'; }}
                      />
                      <button
                        type="button"
                        onClick={() => removeCurrentImage(index)}
                        className="absolute top-1 right-1 bg-red-500 p-1 rounded-full hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <label className="block text-lg font-semibold mb-2">Upload Multiple New Images (Optional)</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full bg-gray-700 border border-gray-600 p-3 rounded text-white focus:outline-none focus:border-green-500"
              accept="image/*"
            />
            <p className="text-gray-400 text-sm mt-2">Select multiple images to replace current ones</p>
          </div>

          {preview.length > 0 && (
            <div>
              <label className="block text-lg font-semibold mb-2">New Images Preview ({preview.length})</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {preview.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      alt={`Preview ${index}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-1 right-1 bg-red-500 p-1 rounded-full hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 p-3 rounded text-lg font-semibold transition"
            >
              {submitting ? 'Updating...' : 'Update Turf'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/owner/dashboard')}
              className="flex-1 bg-gray-600 hover:bg-gray-700 p-3 rounded text-lg font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTurf;
