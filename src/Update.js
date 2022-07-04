import React, {useState, useRef} from "react";
import users from "./users";

const Update = () => {
  // Hooks
  const [nameInput, setNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const currentNameValue = useRef(null);
  const currentPhoneValue = useRef(null);
  const [list, setList] = useState(users);
  const [isUpdate, setIsUpdate] = useState(false);
  const [editId, setEditId] = useState(null);

  // Event - add a new profile 
  const addProfile = (e) => {
    e.preventDefault();
    if (!nameInput || !phoneInput) {
      alert("please enter values");
    } else if (isUpdate) {
        const updatedList = list.map( (profile) => {
          if(profile.id === editId) {
            profile.name = currentNameValue.current.value;
            profile.phone = currentPhoneValue.current.value;
          }
          return profile;
        });
        setList(updatedList);
        console.log("edit",list);
        alert("profile updated!");
        currentNameValue.current.value = null;
        currentPhoneValue.current.value = null;
    } else {
      const newProfile = {
        id: new Date().getTime().toString(),
        name: nameInput,
        phone: phoneInput,
      };
      
      // add newProfile obj to list (data, i.e. backend?)
      // list.push(newProfile);

      // add newProfile to display on webpage
      setList([...list, newProfile]);
      alert("profile added");
      console.log("add",list);
      currentNameValue.current.value = null;
      currentPhoneValue.current.value = null;
    }
  };

  // Component - List
  const List = () => {
    // Event - remove profile 
    const removeProfile = (id) => {
      const filteredList = list.filter( (profile) => profile.id !== id);

      // remove element from list array (data, i.e. backend?)
      // console.log("id",id);
      // console.log(list.indexOf({id}));
      // list.splice(index, 1);

      // remove profile to display on webpage
      setList(filteredList);
      console.log("delete", list);
    };
    
    // Event - edit profile
    const editProfile = (id) => {
      console.log(id);
      list.map( (profile) => {
        if (profile.id === id) {
          currentNameValue.current.value = profile.name;
          currentPhoneValue.current.value = profile.phone;
          setIsUpdate(true);
          setEditId(id);
        }
        return profile;
      });
    };
  
    const displayProfiles = list.map( (profile) => {
      return (
        <article key={profile.id} className="table">
          <p>{profile.name}</p>
          <p>{profile.phone}</p>
          <div className="arrange">
            <button onClick={ () => editProfile(profile.id)}>Edit</button>
            <button onClick={ () => removeProfile(profile.id)}>Delete</button>
          </div>
        </article>
      )
    });
    return (
      <>
        {displayProfiles}
      </>
    );
  }

  return (
    <section>
      <form className="form-control">
        <h3>Profile</h3>
        <div className="arranger">
          <label htmlFor="username">Name</label>
          <input type="text" id="username" name="username" onChange={(e)=> setNameInput(e.target.value)} ref={currentNameValue}/>
        </div>
        <div className="arranger">
          <label htmlFor="phone">Phone</label>
          <input type="telphone" id="phone" name="phone" onChange={(e)=> setPhoneInput(e.target.value)} ref={currentPhoneValue}/>
        </div>
        <input type="submit" value={isUpdate ? "Edit" :"Add"} onClick={addProfile}/>
      </form>
      <h3>List of Profiles</h3>
      <section>
        <section className="table">
          <h4>Name</h4>
          <h4>Phone</h4>
        </section>
        <section>
          <List />
        </section>
      </section>
    </section>
  );
};


export default Update;