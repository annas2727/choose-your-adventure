import { useLocation } from 'react-router-dom';

function StoryPage() {
    const location = useLocation();
    const genre = location.state?.genre;

    return (
        <div className= "header">
            <h1>Choose Your Adventure</h1>
            <p>This is where the story content for the {genre} genre will be displayed.</p>
        </div>
    );
}
export default StoryPage;