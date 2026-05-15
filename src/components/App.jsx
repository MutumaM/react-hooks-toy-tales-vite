import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])


  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleDelete(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      
      method: "DELETE",
    })
    .then(() => setToys(toys.filter(toy => toy.id !== id)))
  }

  function handleLike(id) {
    const toy = toys.find((toy) => toy.id === id)

    fetch(`http://localhost:3001/toys/${id}`, {

        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          likes: toy.likes + 1
        })
       })
      
       .then(response => response.json())
       .then(updatedToy => {
          setToys(toys.map(toy => toy.id === updatedToy.id ? updatedToy : toy))
       })
    
  }
  function handleAddToy (name, image){
    
    fetch("http://localhost:3001/toys" , {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: name,
        image: image,
        likes: 0
      })
   

    })
      .then(response => response.json())
      .then(newToy => setToys([...toys, newToy]))
      
  }
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setToys(data)
      })
  }, [])

  return (
    <>
      <Header />
      {showForm ? <ToyForm handleAddToy={handleAddToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} handleLike={handleLike} handleDelete={handleDelete}/>
    </>
  );
}

export default App;
