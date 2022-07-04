import React, { useState } from "react";
import Update from "./Update";
import users from "./users";

function App() {
  // Hook 
  const [isList, setIsList] = useState(false);

  // Events - Toggle between pages
  const showListingPage = () => {
    setIsList(true);
  };
  const showUpdatePage = () => {
    setIsList(false);
  };

  //  
  const displayUsers = users.map( (profile) => {
    return (
      <article key={profile.id} className="table">
          <p>{profile.name}</p>
          <p>{profile.phone}</p>
        </article>
    );
  });
  
  return (
    <main>
      <h1>Phonebook</h1>
      <nav>
        <input type="button" value="Listing" className="nav-items" onClick={showListingPage}/>
        <input type="button" value="Update" className="nav-items" onClick={showUpdatePage}/>
      </nav>
      {isList ? 
        (
          <section>
            <section className="table">
              <h3>Name</h3>
              <h3>Phone</h3>
            </section>
            {displayUsers}
          </section>
        
        ) : <Update />}
    </main>
  );
};

export default App;
