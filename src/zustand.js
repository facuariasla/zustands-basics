import create from "zustand";

const createUserSlice = (set, get) => ({
  users: [],
  friends: [],
  fetchUsers: async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    set({ users: data });
  },
  addToFriends: (user) => {
    set({
      // El [...newSet()] es un filtro para evitar que pueda agregar mas de 1 vez
      // a la misma persona a la lista de 'friends'
      friends: [...new Set([...get().friends, user])],
    })
  },
  removeUserFromFriends: (userId) =>{
    set({
      friends: get().friends.filter(friend => friend.id !== userId),
    })
  }
});

const useStore = create((set, get) => ({
  ...createUserSlice(set, get),
}));

export default useStore;
