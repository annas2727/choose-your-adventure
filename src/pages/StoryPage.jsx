import { useLocation, useNavigate} from 'react-router-dom';
import Button from './Button.jsx';
import axios from 'axios';
import { useState, useEffect } from 'react';
import restartIcon from '../assets/restart.png';

function StoryPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [genre, setGenre] = useState(null);
    const [story, setStory] = useState("Loading story...");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const genreFromState = location.state?.genre;

        if (!genreFromState) {
            navigate('/');
        } else {
            setGenre(genreFromState);
        }
    }, [location.state, navigate]);

    useEffect(() => {
        if (!genre) return;

       const prompt = `You are a fantasy writer. Begin a choose-your-own-adventure story. 
Start with a vivid paragraph that sets the scene, introduces a character, and hints at a choice the reader must make.`;

        
        axios
             .post("http://localhost:3001/generate", { prompt })
            .then(res => {

                console.log("API response:", res.data);
                const text = res.data[0]?.generated_text || "No story generated.";
                setStory(text);
                setOptions(["Option 1", "Option 2"]); //fix

            })
            .catch((err) => {
                console.error("API error:", err);
                setStory("Error loading story.");
        });
    }, [genre]);

    return (
        <div>
            <div className= "header">
                <h1>Choose Your Adventure</h1>
                <button className = "restart-button" onClick={() => navigate('/')}>
                    <img src={restartIcon} alt="Restart" className="restart-icon" />
                </button>
            </div>
            <div className = "body">
                <p>{story}</p>
            </div>
            <div className = "button-container"> 
                            {options.map((option) => (
                            <Button 
                                key={option} 
                                label={option}
                                onClick={() => alert(`You chose: ${option}`)}//handleGenreClick(option)} 
                            />
                            ))}
            </div>
        </div>
        
    );
}
export default StoryPage;