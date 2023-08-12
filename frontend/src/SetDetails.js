import {useParams} from "react-router-dom";
import StudyCard from "./StudyCard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'

const SetDetails = () => {

    const {id} = useParams()

    const history = useHistory();

    const [set, setSets] = useState(null)
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState(false);

    //fetches data with specific id
    useEffect(() => {
        const fetchSets = async () => {
            const response = await fetch('https://quizzle.onrender.com/api/sets/' + id)
            const json = await response.json()

            if(response.ok){
                setSets(json)
                setPending(false)
            }
            else{
                setError(true)
            }

        }
        
        fetchSets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    //deletes a study set
    const handleClick = async () => {
        const response = await fetch('https://quizzle.onrender.com/api/sets/' + set._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            console.log(error)
          }
          else if(response.ok){
            setError(null)
            console.log("Set Deleted!")
            history.push('/')
          }
        
    }

    return ( 
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {set && 
            <div className="set-details">
                <h2>{set.title}</h2>
                <p>Created by {set.author}</p>

                {/* flash card for set */}
                <StudyCard studySet={set}/>


                {/* previews the terms and definitions in the set */}
                <h2 className="heading-detail">Terms in this set ({set.terms.length})</h2>
                {set.terms.map((term, index) => (
                    <div className="set-preview">
                        <p className="term-preview">{term}</p>
                        <p className="definition-preview">{set.definitions[index]}</p>
                    </div>
                ))}

                
                {/* Links to Test page */}
                {(set.terms.length) > 3 && 
                <button className="test-button">
                    <Link to={`/test/${set._id}`}>
                        Test
                    </Link>
                </button>}
                
                
            

                <button className="delete-button" onClick={handleClick}>Delete</button>
            </div>
            }
        </div>
     );
}
 
export default SetDetails;
