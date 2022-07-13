import create from "zustand";

// Esta funcion va en otro archivo, ej createUserSlice.js
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
    });
  },
  removeUserFromFriends: (userId) => {
    set({
      friends: get().friends.filter((friend) => friend.id !== userId),
    });
  },
});

// Esta funcion va en otro archivo, ej createPostSlice.js
const createPostSlice = (set, get) => ({
  posts: [],
  postsFromFriends: [],
  fetchPosts: async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    set({ posts: data });
  },
  filterPostsByFriends: () => {
    const postsFromFriends = get().posts.filter((post) =>
      get().friends.find((fr) => fr.id === post.id)
    );
    set({postsFromFriends})
  },
});

const useStore = create((set, get) => ({
  ...createUserSlice(set, get),
  ...createPostSlice(set, get),
}));

export default useStore;
