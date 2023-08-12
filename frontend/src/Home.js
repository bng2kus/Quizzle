//TO START APP
//npm run start

import {useEffect, useState} from 'react'
import SetList from "./SetList";


const Home = () => {
    const [studySets, setSets] = useState(null)

    const [isPending, setPending] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchSets = async () => {
            const response = await fetch('/api/sets')
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
    }, [])


    return ( 
        <div className="home">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {studySets && <SetList studySets={studySets} title="Study Sets"/>}
        </div>
     );
}
 
export default Home;
