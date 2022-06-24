
<template>
  <q-layout view="hHh lpr lfr">
    <div id="app" class="tw-bg-slate-900">
      <Nav class="" />
      <router-view />
    </div>
  </q-layout>
</template>

<script>
import Nav from "../components/Nav.vue";
import Echo from "laravel-echo";

export default {
  components: {
    Nav,
  },
  mounted: function () {
    this.$nextTick(function () {
      this.startWebsockets();
    });
  },
  methods: {
    startWebsockets() {
      console.log("Starting websockets");
      window.axios.defaults.baseURL = "https://app.nsgdv.local";
      window.axios.defaults.withCredentials = true;
      window.axios.defaults.headers.common["X-Requested-With"] =
        "XMLHttpRequest";

      window.Echo = new Echo({
        broadcaster: "pusher",
        wsHost: "app.nsgdv.local",
        authEndpoint: "https://app.nsgdv.local/api/broadcasting/user/auth",
        authorizer: (channel, options) => {
          return {
            authorize: (socketId, callback) => {
              axios
                .post("/broadcasting/user/auth", {
                  socket_id: socketId,
                  channel_name: channel.name,
                })
                .then((response) => {
                  console.log(response.data);
                  callback(false, response.data);
                })
                .catch((error) => {
                  console.log(error);
                  callback(true, error);
                });
            },
          };
        },
        key: "49395195-b74c-461f-9ccf-a570284a6aeb",
        encrypted: true,
        disableStats: true,
        enabledTransports: ["ws"],
      });

      window.Echo.connector.pusher.connection.bind("error", function (error) {
        console.log(error);
      });
      window.Echo.connector.pusher.connection.bind("failed", function () {
        console.log("Websocket failed");
      });
      window.Echo.connector.pusher.connection.bind("unavailable", function () {
        console.log("Websocket unavailable");
      });
      window.Echo.connector.pusher.connection.bind("connected", function () {
        console.log("Websocket connected");
      });
      window.Echo.connector.pusher.connection.bind("disconnected", function () {
        console.log("Websocket disconnected");
      });

      const { pathname } = window.location;
      let trimmedPathname = pathname;
      if (!pathname.endsWith("/")) {
        if (trimmedPathname.indexOf("agent") !== -1) {
            var agent_id = trimmedPathname.slice(trimmedPathname.lastIndexOf("/") + 1)
            console.log('start listening: ' + agent_id)
          window.Echo.private(
            "jobs." + agent_id
          ).listen("JobsNotify", (data) => {
            console.log(data);
          });
        }
      }
    },
  },
};
</script>