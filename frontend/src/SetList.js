import {Link} from "react-router-dom"

const SetList = ({studySets, title}) => {

    return ( 
        <div className="blog-list">
            <h2>{title}</h2>
            {studySets.map((set) => (
                <div className="blog-preview" key={set._id}>
                    <Link to={`/sets/${set._id}`}>
                        <h2>{set.title}</h2>
                        <p>Created by {set.author}</p>
                    </Link>
                </div>
            ))}
        </div>
     );
}
 
export default SetList;