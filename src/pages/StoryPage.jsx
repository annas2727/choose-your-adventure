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

        const prompt = `Write the first paragraph of a fantasy choose-your-own-adventure story.
At the end, include two choices the reader can make.
Be creative and descriptive.
Format it like this:

Story: ...
Choices:
1. ...
2. ...`;
        
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