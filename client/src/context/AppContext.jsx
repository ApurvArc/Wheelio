import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY;

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    const [vehicles, setVehicles] = useState([]);
    const [cityList, setCityList] = useState([]);

    // --- Theme State Management ---
    // Initialize theme from localStorage to persist user preference on refresh
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        if (theme === 'dark') {
            // Adds 'dark' class to <html> for Tailwind's dark: variant
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);
    // -----------------------------------

    // Function to check if user is logged in
    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/user/data");
            if (data.success) {
                setUser(data.user);
                setIsOwner(data.user.role === "owner");
            } else {
                toast.error("Session expired, please login again");
                setToken(null);
                setUser(null);
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setToken(null);
            setUser(null);
            localStorage.removeItem("token");
        }
    };

    const fetchVehicles = async () => {
        try {
            const { data } = await axios.get("/api/user/vehicles");
            if (data.success) {
                setVehicles(data.vehicles);
                const locations = [...new Set(data.vehicles.map(vehicle => vehicle.location))].sort();
                setCityList(locations);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Function to log out the user
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsOwner(false);
        axios.defaults.headers.common["Authorization"] = "";
        toast.success("You have been logged out");
    };

    // useEffect to retrieve the token from localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
        fetchVehicles();
    }, []);

    // useEffect to fetch user data when token is available
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `${token}`;
            fetchUser();
        }
    }, [token]);

    const value = {
        navigate, currency, axios, user, setUser,
        token, setToken, isOwner, setIsOwner, fetchUser, showLogin, setShowLogin,
        logout, vehicles, setVehicles, pickupDate, setPickupDate, returnDate, setReturnDate, fetchVehicles,
        cityList,
        theme, toggleTheme,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
};