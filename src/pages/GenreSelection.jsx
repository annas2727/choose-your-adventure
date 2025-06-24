import { useNavigate } from "react-router-dom";
import Button from "./Button.jsx";


function GenreSelection() {
    const genres = ["Fantasy", "Science Fiction", "Mystery", "Romance", "Horror"];
    const navigate = useNavigate();
    const handleGenreClick = (genre) => {
        navigate('/story', { state: { genre } });
    }
    return (
        <div>
            <div className = "header">
                <h1>Choose Your Adventure</h1>
                <h2>Pick a genre to explore: </h2>
            </div>
            
            <div className = "button-container"> 
                {genres.map((genre) => (
                <Button 
                    key={genre} 
                    label={genre}
                    onClick={() => handleGenreClick(genre)} 
                />
                ))}
            </div>
        </div>
    );
}
export default GenreSelection;