import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { LockClosedIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password
      });

      setToken(res.data.token);
      navigate('/notes');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-gray-900 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-10 max-w-md w-full border border-white/20">
        <div className="text-center text-white">
          <h2 className="text-3xl font-extrabold">📝 Create your Notes App account</h2>
          <p className="mt-2 text-sm">
            Already have an account?{' '}
            <Link to="/" className="font-medium text-indigo-300 hover:text-indigo-500">
              Sign in here
            </Link>
          </p>
        </div>

        {error && (
          <div className="mt-4 p-3 text-sm text-red-100 bg-red-500/60 rounded-md">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white">
                Username
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserIcon className="w-5 h-5 text-white/50" />
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  className="block w-full py-2 pl-10 pr-3 rounded-md bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email address
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <EnvelopeIcon className="w-5 h-5 text-white/50" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  className="block w-full py-2 pl-10 pr-3 rounded-md bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="w-5 h-5 text-white/50" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  className="block w-full py-2 pl-10 pr-3 rounded-md bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-6 w-full py-2 px-4 text-white font-medium rounded-md transition-all duration-200 ${
              isLoading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
