import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys, handleLike, handleDelete}) {
  return (
    <div id="toy-collection">{
      toys
        .map((toy) => (
          <ToyCard  key={toy.id} toy={toy} handleLike={handleLike} handleDelete={handleDelete}/>
         ))  
    }
    </div>
  );
}

export default ToyContainer;
