import { useState } from "react";
import "./App.css";
import data from "./contacts.json";

const initContacts = data.splice(0,5)

function App() {
  const [contacts, setContacts] = useState(initContacts)
  const [outRemaining, setOutRemaining] = useState(data)

  const addRandomContact = () => {
    if (outRemaining && outRemaining.length > 0) {
      let index = Math.floor(Math.random() * outRemaining.length);
      setContacts([...contacts, outRemaining[index]]);
      let filtered = outRemaining.filter((contact, i) => {
        return i != index;
      })
      setOutRemaining(filtered)
    }
  }

  function byPopularity() {
    let sorted = contacts.sort((a,b) => b.popularity - a.popularity)
    setContacts([...sorted])
  }

  function byName() {
    let sorted = contacts.sort((a,b) => a.name.localeCompare(b.name))
    setContacts([...sorted])
  }
  
  function byNameBackwards() {
    let sorted = contacts.sort((a,b) => b.name.localeCompare(a.name))
    setContacts([...sorted])
  }

  function deleteContact(id) {
    let filtered = contacts.filter(contact => {
      return contact.id != id;
    })
    setContacts([...filtered])
  }
  return (
    <div className="App">
      <h2>IronContacts</h2>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={byPopularity}>Sort By Popularity</button>
      <button onClick={byName}>Sort By Name A-Z</button>
      <button onClick={byNameBackwards}>Sort By Name Z-A</button>
      <table>
        <thead>
          <tr>
            <th>
              <h3>Picture</h3>
            </th>
            <th>
              <h3>Name</h3>
            </th>
            <th>
              <h3>Popularity</h3>
            </th>
            <th>
              <h3>Won Oscar</h3>
            </th>
            <th>
              <h3>Won Emmy</h3>
            </th>
            <th>
              <h3>Delete</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img src={contact.pictureUrl} alt="shouldBeImage" />
              </td>
              <td>
                <h3>{contact.name}</h3>
              </td>
              <td>
                <h3>{contact.popularity.toFixed(2)}</h3>
              </td>
              <td>
                <h3>{contact.wonOscar ? "🏆" : "❌"}</h3>
              </td>
              <td>
                <h3>{contact.wonEmmy ? "🟡" : "❌"}</h3>
              </td>
              <td><button onClick = {() => deleteContact(contact.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
