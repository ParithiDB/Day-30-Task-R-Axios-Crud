
import './App.css';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [company, setCompany] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  
  useEffect(() => {
    Axios.get("http://localhost:3000/Mocks/users.json")
      .then((response) => {
        if (response && response.status === 200) {
          setUsers(response.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleEditUser = (user) => {
    setEditMode(true);
    setEditUserId(user.id);
    setEditedUser(user);
    setName(user.name);
    setUsername(user.username);
    setEmail(user.email);
    setCity(user.address.city);
    setCompany(user.company.name);
  };
 
  const addUser = () => {
    if (editMode) {
      const updatedUsers = users.map((user) => {
        if (user.id === editUserId) {
          return {
            ...user,
            name,
            username,
            email,
            address: { ...user.address, city },
            company: { ...user.company, name: company },
          };
        }
        return user;
      });
      setUsers(updatedUsers);
      setEditMode(false);
      setEditUserId(null);
      setEditedUser(null);
    } else {
      const newUser = {
        id: users.length + 1,
        name,
        username,
        email,
        address: {
          city,
        },
        company: {
          name: company,
        },
      };
      setUsers([...users, newUser]);
    }

    setName('');
    setUsername('');
    setEmail('');
    setCity('');
    setCompany('');
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const renderAddUserButton = () => {
    return (
      <button type="button" className="btn btn-primary mb-2 mt-1" onClick={addUser}>
        <span className='fw-bold'>{editMode ? 'Edit User' : '+ Add User'}</span>
      </button>
    );
  };


  return (
    <div className='App'>
      <h1 className='py-3'>User List</h1>
      
      
        <div>
        <div className='container'>
          <input placeholder='Enter Name'
            className='me-5 mb-3'
            value={name}
            onChange={(e) => setName(e.target.value)}
            defaultValue={editedUser ? editedUser.name : ''}
          />
          <input placeholder='Enter UserName' 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          defaultValue={editedUser ? editedUser.username : ''}
          />
          <br/>
          <input placeholder='Enter E-mail' className='me-5 mb-3'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={editedUser ? editedUser.email : ''}
          />
          <input placeholder='Enter City' 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          defaultValue={editedUser ? editedUser.address.city : ''}
          />
          <br/>
          <input placeholder='Enter Company' 
           value={company}
           onChange={(e) => setCompany(e.target.value)}
           defaultValue={editedUser ? editedUser.company.name : ''}
           />
          <div className='w-100 d-flex justify-content-end'>
          {renderAddUserButton()}
          </div>
       
        <div className='row'>
        <div className="table-responsive">
            <table className="table table-success table-hover table-striped">
            <thead className='table-dark'>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">UserName</th>
                <th scope="col">E-mail</th>
                <th scope="col">City</th>
                <th scope="col">Company</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
        {users.map((d , i) => (
         
          
         <tbody>
         <tr key={d.id}>
           <th scope="row">{d.id}</th>
           <td>{d.name}</td>
           <td>{d.username}</td>
           <td>{d.email}</td>
           <td>{d.address.city}</td>
           <td>{d.company.name}</td>
           <td>
               <button type="button" class="btn btn-info btn-sm me-1" onClick={() => handleEditUser(d)}>Edit</button>
               <button type="button" class="btn btn-danger btn-sm"  onClick={() => handleDeleteUser(d.id)}>Delete</button>
            </td>
         </tr>
       </tbody>
            
              
        ))}
        </table>
              </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default App;



