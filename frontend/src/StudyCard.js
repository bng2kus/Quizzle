import { useState, useEffect } from "react";

const StudyCard = ({studySet}) => {

    //value to handle switiching between term and definition
    const [cardState, setCardState] = useState("terms");
    //value to guide index
    const [index, setIndex] = useState(0);


    //changes card from term to definition
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleCardState = () => {
        if(cardState === 'terms'){
            setCardState('definitions');
        }
        else if(cardState === 'definitions'){
            setCardState('terms');
        }
    }

    //function to change index
    const handleIndex = (direction) => {
      if (direction === "next") {
        // Loop back to the 0th index at last index
        if (index === studySet.terms.length - 1) {
          setIndex(0);
        }
        //for every other index before the last index
        else {
          setIndex((prevIndex) => prevIndex + 1);
        }
      } 
      else if (direction === "last") {
        //loops to the last inde of the array at the 0th index
        if (index === 0) {
          setIndex(studySet.terms.length - 1);
        }
        //runs back through the previous index before the first index
        else {
          setIndex((prevIndex) => prevIndex - 1);
        }
      }
    }



    //useEffect to handle key presses
    useEffect(() => {
        const handleKeyPress = (event) => {
          if (event.code === 'Space') {
            event.preventDefault(); // Prevent space bar from scrolling the page
            handleCardState(); // Call the button click handler function
          }
          else if(event.code === "ArrowLeft"){
            event.preventDefault();
            handleIndex("last");
          }
          else if(event.code === "ArrowRight"){
            event.preventDefault();
            handleIndex("next");
          }
          
          
        };
    
        document.addEventListener("keydown", handleKeyPress);
    
        return () => {
          document.removeEventListener("keydown", handleKeyPress);
        };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [handleCardState]);

    
    

    return ( 
        <div className="flash-card">
            <p className="show-index">{index + 1} / {studySet.terms.length}</p>
            {/* 
                If cardState is equal to "terms" render the first button
                If cardState is equal to "definitions render the second button"
            */}
            {cardState === "terms" && (<button className="text-button" onClick={handleCardState}>{studySet.terms[index]}</button>)}
            {cardState === "definitions" && (<button className="text-button" onClick={handleCardState}>{studySet.definitions[index]}</button>)}

            <div className="button-wrapper">
                <button className="right-button" onClick={() => handleIndex("last")}>Last</button>
                <button className="left-button" onClick={() => handleIndex("next")}>Next</button>
            </div>
        </div>

     );
}
 
export default StudyCard;