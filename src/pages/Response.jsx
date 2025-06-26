import axios from 'axios';

export const generateStory = async (prompt) => {
    try {
        const res = await axios.post("http://localhost:3001/generate", { prompt });
          
        console.log("API response:", res.data);
        const text = res.data[0]?.story || "No story generated.";
                
        const parts = text.split('|').map(part => part.trim());        
        
        return {
            title: parts[0] || "Untitled",
            story: parts[1] || "No story content.",
            options: [parts[2], parts[3]].filter(Boolean) // Filter out any empty options,
        }

    } catch (error) {
        console.error("API error:", error);
        return {
            title: "Error",
            story: "Failed to generate story. Please try again.",
            options: [],
        }
    }
};