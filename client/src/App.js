import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import './stylesheets/alignments.css';
import './stylesheets/sizes.css';
import './stylesheets/theme.css';
import './stylesheets/custom-components.css';
import './stylesheets/form-elements.css';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';
import Loader from './components/Loader';
import FirstPage from './pages/First';
import Profile from './pages/Profile';
import BooksPage from './pages/Books';
import BlogsPage from './pages/BlogsPage';
import BookDescription from './pages/BookDescription';
import PostDescription from './pages/PostDescription';

function App() {

  const { loading } = useSelector((state) => state.loaders);

  return (
    <div>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/allBooks" element={<ProtectedRoute><BooksPage /></ProtectedRoute>} />
          <Route path="/allPosts" element={<ProtectedRoute><BlogsPage /></ProtectedRoute>} />
          <Route path="/book/:id" element={<ProtectedRoute><BookDescription /></ProtectedRoute>} />
          <Route path="/post/:id" element={<ProtectedRoute><PostDescription /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
