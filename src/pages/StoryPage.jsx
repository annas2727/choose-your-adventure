import { useLocation, useNavigate} from 'react-router-dom';
import Button from './Button.jsx';
import axios from 'axios';
import { useState, useEffect } from 'react';

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

        const prompt = `Write the beginning of a ${genre} adventure story with two possible choices.`;
        
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
                setStory("Error loading story." + genre);
        });
    }, [genre]);

    return (
        <div>
            <div className= "header">
                <h1>Choose Your Adventure</h1>
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