
<template>
<q-header reveal class="bg-black">
 <q-toolbar class="bg-primary text-white">
      <q-toolbar-title><a href="/">Acronis Seeding Tool</a></q-toolbar-title>
      <q-btn href="/agent/installer" flat no-caps label="Agent Installer" />
      <q-btn href="/settings" flat no-caps label="Settings" />
      <q-btn href="/logout" flat no-caps label="Logout" />
    </q-toolbar>
</q-header>
</template>

<script>
import { Link } from "@inertiajs/inertia-vue3";

export default {
  components: {
    Link,
  },
  methods: {
    getDrives() {
      axios
        .post("/getWindowsDrives", { agent_id: 1 })
        .then((response) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error.response);
          this.errors.push(error.response.data.message);
        });
    },
  },
};
</script>