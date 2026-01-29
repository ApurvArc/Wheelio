import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

  const { setShowLogin, axios, setToken, navigate } = useAppContext()

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // State for Google new user name prompt
  const [showNamePrompt, setShowNamePrompt] = React.useState(false);
  const [googleUserName, setGoogleUserName] = React.useState("");
  const [tempToken, setTempToken] = React.useState(null);

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(`/api/user/${state}`, { name, email, password })

      if (data.success) {
        navigate('/')
        setToken(data.token)
        localStorage.setItem('token', data.token)
        setShowLogin(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  // Google OAuth handler (Code Flow)
  const handleGoogleLogin = async (response) => {
    try {
      // Send auth code to backend
      const { data } = await axios.post('/api/user/google', {
        code: response.code
      })

      if (data.success) {
        if (data.isNewUser) {
          setTempToken(data.token);
          setShowNamePrompt(true);
        } else {
          navigate('/')
          setToken(data.token)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
          toast.success('Logged in with Google!')
        }
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  // Handle name submission for new Google users
  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (!googleUserName.trim() || googleUserName.trim().length < 2) {
      toast.error('Please enter a valid name');
      return;
    }

    try {
      axios.defaults.headers.common['Authorization'] = tempToken;
      const { data } = await axios.put('/api/user/update-name', {
        name: googleUserName.trim()
      });

      if (data.success) {
        navigate('/')
        setToken(tempToken)
        localStorage.setItem('token', tempToken)
        setShowLogin(false)
        toast.success('Welcome to Wheelio!')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  const skipNamePrompt = () => {
    navigate('/')
    setToken(tempToken)
    localStorage.setItem('token', tempToken)
    setShowLogin(false)
    toast.success('Welcome to Wheelio!')
  };

  // Initialize Google Sign-In (Code Flow)
  useEffect(() => {
    if (window.google && !showNamePrompt) {
      // Initialize Code Client
      const client = window.google.accounts.oauth2.initCodeClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: 'email profile',
        ux_mode: 'popup',
        callback: handleGoogleLogin,
      });

      // Render custom button or use simple button that triggers client.requestCode()
      const googleBtn = document.getElementById('google-signin-btn');
      if (googleBtn) {
        googleBtn.onclick = () => client.requestCode();
      }
    }
  }, [showNamePrompt]);

  if (showNamePrompt) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 z-[999] flex items-center text-sm text-gray-600 bg-black/50 backdrop-blur-sm">
        <form onSubmit={handleNameSubmit} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 dark:text-gray-300 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800">
          <p className="text-2xl font-medium m-auto text-gray-800 dark:text-white"><span className="text-primary">Welcome!</span> Set Your Name</p>
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">Please enter your name to complete your profile</p>
          <div className="w-full">
            <p className="dark:text-gray-300">Your Name</p>
            <input onChange={(e) => setGoogleUserName(e.target.value)} value={googleUserName} placeholder="Enter your name" className="border border-gray-200 dark:border-gray-600 rounded w-full p-2 mt-1 outline-primary dark:bg-slate-900 dark:text-white" type="text" autoFocus />
          </div>
          <button type="submit" className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">Save & Continue</button>
          <button type="button" onClick={skipNamePrompt} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all w-full py-2 cursor-pointer text-center">Skip for now</button>
        </form>
      </div>
    );
  }

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-[999] flex items-center
      text-sm text-gray-600 bg-black/50 backdrop-blur-sm"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] 
        text-gray-500 dark:text-gray-300 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800"
      >
        <p className="text-2xl font-medium m-auto text-gray-800 dark:text-white">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p className="dark:text-gray-300">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 dark:border-gray-600 rounded w-full p-2 mt-1 outline-primary dark:bg-slate-900 dark:text-white"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p className="dark:text-gray-300">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 dark:border-gray-600 rounded w-full p-2 mt-1 outline-primary dark:bg-slate-900 dark:text-white"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p className="dark:text-gray-300">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 dark:border-gray-600 rounded w-full p-2 mt-1 outline-primary dark:bg-slate-900 dark:text-white"
            type="password"
            required
          />
        </div>

        {state === "register" ? (
          <p className="dark:text-gray-400">
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p className="dark:text-gray-400">
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        )}

        <button className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center w-full gap-3">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="text-gray-400 text-xs">OR</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>

        {/* Google Sign-In Button (Custom UI for Code Flow) */}
        <button
          id="google-signin-btn"
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 rounded-md py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all bg-white dark:bg-transparent text-gray-700 dark:text-gray-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default Login;