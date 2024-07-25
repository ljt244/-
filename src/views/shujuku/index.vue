<template>
  <div>
    <h1>Users</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
    <form @submit.prevent="addUser">
      <input v-model="newUser.name" placeholder="Name" required />
      <button type="submit">Add User</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
   name: 'DatabaseIndex',
  data () {
    return {
      users: [],
      newUser: {
        name: ''
      }
    };
  },
  created () {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers () {
      try {
        const response = await axios.get('/api/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async addUser () {
      try {
        const response = await axios.post('/api/users', this.newUser);
        this.users.push(response.data);
        this.newUser.name = '';
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }
  }
};
</script>