import { useLocation, useNavigate} from 'react-router-dom';
import Button from './Button.jsx';
import { useState, useEffect } from 'react';
import restartIcon from '../assets/restart.png';
import { generateStory } from './Response.jsx';


function StoryPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [genre, setGenre] = useState(null);
    const [story, setStory] = useState("Loading story...");
    const [options, setOptions] = useState([]);
    const [title, setTitle] = useState(null);
    const [step, setStep] = useState(0);
    const maxSteps = 2;


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
      const prompt = `You are a skilled ${genre} writer. Begin a choose-your-own-adventure story written in the second-person perspective ("you" are the main character).

Requirements:
- Write a short, compelling title (maximum 5 words). Do NOT include any special characters or brackets in the title.
- Write a vivid introductory paragraph that sets the scene, introduces the main character (the reader), and leads up to a meaningful choice.
- Provide exactly two clear and distinct choices the reader must make.
- Use the pipe symbol '|' to separate each part. Do not include extra pipe characters or place one at the beginning or end.

Format your response exactly like this:
Title | Story Introduction | First Choice | Second Choice |

Make sure:
- The title has no brackets or special characters
- There are no missing or extra pipe symbols
- Each option is a full, coherent sentence (less than 15 words) that begins with a verb or action
`;


    generateStory(prompt).then(( {title, story, options }) => {
        
        setTitle(title);
        setStory(story);
        setOptions(options);
        setStep(1);
    });
    }, [genre]);

    const handleOptionClick = (option) => {
        if (step === maxSteps-1) {
            const endingPrompt = `You are a ${genre} writer. Continue this choose-your-own-adventure story in the second person perspective.
You will continue from the last paragraph of the story, which is: "${story}" and the user choose "${option}". This is the end of the sotry
and needs to have a satifying ending and conclusion. It will need to be a complete ending that wraps up the story and does not leave any loose ends.
Include:
1. A bolded title in brackets [Title]
2. A descriptive story paragraph in relation to the user's choice, continuing the narrative but don't include the previous story in your response.
Do not include extra symbols in the title or options, including []* . The Title, story are separated by | as delimiters on each side, before and after each option but dont have two in a row. 
The format should be as follows:
[Title] | [Next paragraph that also relates the story with the user's previously chosen option and concludes the story] `;
        generateStory(endingPrompt).then(({ story, options }) => {
        setStory(story);
        setOptions(options);
        setStep(prevStep => prevStep + 1);
    });
        } else {
        const newPrompt = `You are a ${genre} writer. Continue this choose-your-own-adventure story in the second person perspective.
You will continue from the last paragraph of the story, which is: "${story}" and the user choose "${option}".
Include:
1. A bolded title in brackets [Title]
2. A descriptive story paragraph in relation to the user's choice, continuing the narrative but don't include the previous story in your response.
3. Two options for what the character can do next. Make sure there are two complete options. 
Do not include extra symbols in the title or options, including []* . The Title, story, and options are separated by | as delimiters on each side, before and after each option but dont have two in a row. 
The format should be as follows:
[Title] | [Next paragraph that also relates the story with the user's previously chosen option] | [Option] | [Option] |`;
    
    generateStory(newPrompt).then(({ story, options }) => {
        setStory(story);
        setOptions(options);
        setStep(prevStep => prevStep + 1);
    });
    }
};

    return (
        <div>
            <div className= "header">
                <h1>Choose Your Adventure</h1>
                <button className = "restart-button" onClick={() => navigate('/')}>
                    <img src={restartIcon} alt="Restart" className="restart-icon" />
                </button>
            </div>
            <div className = "body">
                <h3>{title}</h3>
                <p>{story}</p>
            </div>
            <div className="button-container"> 
            {step <= maxSteps -1 ? (
                options.map((option, idx) => (
                <Button 
                    key={idx} 
                    label={option}
                    onClick={() => handleOptionClick(option)} 
                />
                ))
            ) : (
                <button className="play-again-button" onClick={() => navigate('/')}>
                Play Again
                </button>
            )}
            </div>

        </div>
        
    );
}
export default StoryPage;