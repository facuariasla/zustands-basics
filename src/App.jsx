import { useEffect } from "react";
import useStore from "./zustand";

function App() {
  const users = useStore((state) => state.users);
  const fetchUsers = useStore((state) => state.fetchUsers);

  const friends = useStore((state) => state.friends);
  const addToFriends = useStore((state) => state.addToFriends);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>Users</h1>
      {/* USERS */}
      <div>
        <ul>
          {users?.map((el) => (
            <li onClick={() => addToFriends(el)} key={Math.random() * 999}>
              {el.name}
            </li>
          ))}
        </ul>
      </div>

      {/* FRIENDS */}
      <div>
        <h2>Friends ({friends.length})</h2>
        <div>
          <ul style={{color: 'green'}}>
          {friends?.map((el) => (
            <li key={el.id}>{el.name}</li>
          ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
