import React from "react";
import { useNavigate } from "react-router-dom";
import './HomeScreen.css';

const HomeScreen = () => {

    const navigate = useNavigate()

    const handleHomePage = () => {
        // Navigate to the home page
        navigate(`/home-page`);
    };

    return (
        <div className="App">
            <div className="container">
                <header className="header">
                    <h1>Welcome to IN000A1 Toastmasters Club!</h1>
                    <p>Fly high! Your boundaries are nothing but yourself.</p>
                </header>
                <body>
                    <button
                        className="go-to-home-page-button"
                        onClick={handleHomePage}
                    >
                        Go to Home page
                    </button>
                </body>
                <footer className="footer">
                    <p>&copy; 2024 Vaibhav Shejol. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
export default HomeScreen;