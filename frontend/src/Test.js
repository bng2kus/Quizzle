import {useParams} from "react-router-dom";
import Questions from "./Questions";
import {useEffect, useState} from 'react'


const Test = () => {
    const {id} = useParams()

    const [set, setSets] = useState(null)
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState(false);

    //fetches data with specific id
    useEffect(() => {
        const fetchSets = async () => {
            const response = await fetch('/api/sets/' + id)
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

    return (
        <div className="test">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {set && 
            <div className="test-container">
                <h2 className="test-title">{set.title} Test</h2>
                <Questions set = {set} id = {id}/>
            </div>}
        </div>
     );
}
 
export default Test;
