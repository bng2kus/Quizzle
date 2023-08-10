import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Create = () => {
  //values to record inputs
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [terms, setTerms] = useState([]);
  const [definitions, setDefinitions] = useState([]);

  //message to show if any values need to be inputted
  const [showMessage, setShowMessage] = useState(false);

  //error message to show POST request error
  const [error, setError] = useState(null);

  //history object to take user back to home page
  const history = useHistory();

  //handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const set = { title, author, terms, definitions };
    console.log(set);

    if(title === '' || author === '' || terms.length < 3){
        console.log("All values must have input");
        setShowMessage(true);
        // Hide the popup message after 3000 milliseconds (3 seconds)
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    }
    else{
        //POST request
        const response = await fetch('/api/sets', {
          method: 'POST',
          body: JSON.stringify(set),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = await response.json()

        if(!response.ok){
          setError(json.error)
          console.log(error)
        }
        else if(response.ok){
          setError(null)
          console.log("New Set Added!");
          history.push("/");
        }

    }

  };

  const handleTermChange = (index, value) => {
    const updatedTerms = [...terms];
    updatedTerms[index] = value;
    setTerms(updatedTerms);
  };

  const handleDefinitionChange = (index, value) => {
    const updatedDefinitions = [...definitions];
    updatedDefinitions[index] = value;
    setDefinitions(updatedDefinitions);
  };

  const addTerm = () => {
    setTerms([...terms, '']);
    setDefinitions([...definitions, '']);
  };

  return (
    
    <div className="create">
      {showMessage && <h2>Please Fill All Fields</h2>}
      <h2>Create a New Set</h2>
      <form>
        <label>Set Title</label>
        <input
          type="text"
          placeholder="Enter Set Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Set Author</label>
        <input
          type="text"
          placeholder="Enter Set Author"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <label>Terms and Definitions</label>
        {terms.map((term, index) => (
          <div className="def-term" key={index}>
            <input
              type="text"
              placeholder="Enter Term"
              required
              value={term}
              onChange={(e) => handleTermChange(index, e.target.value)}
            />

            <input
              type="text"
              placeholder="Enter Definition"
              required
              value={definitions[index]}
              onChange={(e) => handleDefinitionChange(index, e.target.value)}
            />
          </div>
        ))}

        <button onClick={addTerm}>Add Term</button>

        <button onClick={handleSubmit}>Add Set</button>
      </form>
    </div>
  );
};

export default Create;
