import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit2, Trash2, LogOut, Upload } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingBookId, setEditingBookId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', slug: '', subtitle: '', description: '', 
    category: 'Intelligence', author: 'The Cognitive Code', 
    youtubeUrl: '', content: ''
  });
  const [coverFile, setCoverFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchBooks();
  }, [token, navigate]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/books`);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    navigate('/admin/login');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(books.filter(b => b._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete book');
    }
  };

  const handleEdit = (book) => {
    setEditingBookId(book._id);
    setFormData({
      title: book.title, slug: book.slug, subtitle: book.subtitle || '', 
      description: book.description, category: book.category, 
      author: book.author || 'The Cognitive Code', 
      youtubeUrl: book.youtubeUrl || '', content: book.content || ''
    });
    setCoverFile(null);
    setPdfFile(null);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    if (coverFile) data.append('cover', coverFile);
    if (pdfFile) data.append('pdf', pdfFile);

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (editingBookId) {
        await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/books/${editingBookId}`, data, config);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/books`, data, config);
      }
      
      await fetchBooks();
      setShowForm(false);
      setEditingBookId(null);
      setFormData({
        title: '', slug: '', subtitle: '', description: '', category: 'Intelligence', author: 'The Cognitive Code', youtubeUrl: '', content: ''
      });
    } catch (err) {
      console.error(err);
      alert('Failed to save book. Check console for details.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleFileSelect = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1 MB = 1048576 bytes
    if (file.size > 1048576) {
      alert(`The ${type === 'cover' ? 'Cover Image' : 'PDF File'} must be smaller than 1 MB.`);
      e.target.value = ''; // Reset the file input
      if (type === 'cover') setCoverFile(null);
      if (type === 'pdf') setPdfFile(null);
      return;
    }

    if (type === 'cover') setCoverFile(file);
    if (type === 'pdf') setPdfFile(file);
  };

  return (
    <div className="bg-surface min-h-screen pb-12">
      <div className="bg-brand-brown text-surface p-4 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="font-serif text-2xl font-bold">Admin Dashboard</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm hover:text-parchment">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        {!showForm ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-brand-brown">Manage Books</h2>
              <button 
                onClick={() => { setShowForm(true); setEditingBookId(null); }}
                className="bg-brand-olive text-surface px-4 py-2 rounded font-medium flex items-center gap-2 hover:bg-brand-olive/90"
              >
                <Plus size={18} /> Add New Book
              </button>
            </div>

            {loading ? (
              <p>Loading books...</p>
            ) : (
              <div className="bg-white rounded-lg shadow border border-brand-brown/10 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-brown/5 text-brand-brown-sec text-sm uppercase tracking-wider">
                      <th className="p-4 border-b border-brand-brown/10">Cover</th>
                      <th className="p-4 border-b border-brand-brown/10">Title</th>
                      <th className="p-4 border-b border-brand-brown/10">Category</th>
                      <th className="p-4 border-b border-brand-brown/10">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map(book => (
                      <tr key={book._id} className="hover:bg-surface/50 border-b border-brand-brown/5">
                        <td className="p-4">
                          <img src={book.coverImageUrl} alt="Cover" className="w-12 h-16 object-cover rounded" />
                        </td>
                        <td className="p-4 font-medium text-brand-brown">{book.title}</td>
                        <td className="p-4 text-brand-olive text-sm">{book.category}</td>
                        <td className="p-4">
                          <div className="flex gap-3">
                            <button onClick={() => handleEdit(book)} className="text-blue-600 hover:text-blue-800">
                              <Edit2 size={18} />
                            </button>
                            <button onClick={() => handleDelete(book._id)} className="text-red-600 hover:text-red-800">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {books.length === 0 && (
                      <tr><td colSpan="4" className="p-8 text-center text-brand-brown-sec">No books found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-brand-brown/10 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6 border-b border-brand-brown/10 pb-4">
              <h2 className="text-2xl font-serif text-brand-brown">
                {editingBookId ? 'Edit Book' : 'Add New Book'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-brand-brown-sec hover:text-brand-brown">
                Cancel
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1 text-brand-brown">Title *</label>
                  <input type="text" required className="w-full border rounded p-2 text-brand-brown" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-brand-brown">Slug (URL friendly) *</label>
                  <input type="text" required className="w-full border rounded p-2 text-brand-brown" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="e.g. psychology-of-habits" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-brand-brown">Subtitle</label>
                <input type="text" className="w-full border rounded p-2 text-brand-brown" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-brand-brown">Description *</label>
                <textarea required rows="4" className="w-full border rounded p-2 text-brand-brown" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1 text-brand-brown">Category *</label>
                  <select className="w-full border rounded p-2 text-brand-brown" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    {['Intelligence', 'Addiction', 'Human Behavior', 'Habits', 'Motivation', 'Personality', 'Cognitive Psychology', 'Relationships', 'Self-Improvement'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-brand-brown">Author</label>
                  <input type="text" className="w-full border rounded p-2 text-brand-brown" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 bg-surface rounded border border-brand-brown/10">
                <div>
                  <label className="block text-sm font-medium mb-1 text-brand-brown flex items-center gap-2">
                    <Upload size={16} /> Cover Image {editingBookId ? '(Optional)' : '*'}
                  </label>
                  <input type="file" accept="image/*" onChange={e => handleFileSelect(e, 'cover')} required={!editingBookId} className="w-full text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-brand-brown flex items-center gap-2">
                    <Upload size={16} /> PDF File {editingBookId ? '(Optional)' : '*'}
                  </label>
                  <input type="file" accept="application/pdf" onChange={e => handleFileSelect(e, 'pdf')} required={!editingBookId} className="w-full text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-brand-brown">YouTube Video URL</label>
                <input type="url" className="w-full border rounded p-2 text-brand-brown" value={formData.youtubeUrl} onChange={e => setFormData({...formData, youtubeUrl: e.target.value})} placeholder="https://youtube.com/watch?v=..." />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-brand-brown">Content (Optional HTML for reading view)</label>
                <textarea rows="4" className="w-full border rounded p-2 text-brand-brown" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})}></textarea>
              </div>

              <button type="submit" disabled={formLoading} className="w-full bg-brand-brown text-surface font-semibold py-3 rounded hover:bg-brand-brown/90 mt-4 disabled:opacity-70">
                {formLoading ? 'Saving...' : (editingBookId ? 'Update Book' : 'Publish Book')}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
