// Utilities
import { defineStore } from "pinia";
import { useRoute } from "vue-router";

const useAppStore = defineStore("api", {
  state: () => ({
    servers: {},
    baseURL: "/api/v1/",
    gameList: [],
    currentServer: undefined
  }),
  getters: {
    currentServer: function (state) {
      let route = useRoute();
      let servername = route.params.servername;
      if (servername == undefined) return undefined;

      let server = this.servers[servername];
      if (server == undefined) {
        // Try fetch it
        this.updateServer(servername);
      }

      return server;
    },
  },
  actions: {
    updateServerList: function (serverPerPage, pageNumber) {
      let endpoint =
        this.baseURL +
        `server/?with_details=false&limit=${serverPerPage}&page=${pageNumber}`;
      fetch(endpoint).then(async (res) => {
        try {
          let server_list = await res.json();
          for (let server of server_list) {
            let currentData = this.servers[server.server_name];
            this.servers[server.server_name] =
              currentData != undefined ? currentData : server;
          }
        } catch (e) {
          console.error(e);
        }
      });
    },
    updateServer: function (server_name) {
      let endpoint = this.baseURL + `server/${server_name}?with_details=false`;
      return new Promise((resolve, reject) => {
        fetch(endpoint).then(async (res) => {
          try {
            let server = await res.json();
            let tmp = this.servers[server_name];
            this.servers[server_name] = server;
            if (tmp != undefined)
              this.servers[server_name].details = tmp.details;

            resolve(server);
          } catch (e) {
            reject(e);
          }
        });
      });
    },
    feedServerDetails: function (server_name) {
      let endpoint = this.baseURL + `server/${server_name}?with_details=true`;
      return new Promise((resolve, reject) => {
        fetch(endpoint).then(async (res) => {
          try {
            let server = await res.json();
            let serverDetails = server.details;
            if (this.servers[server_name] != undefined)
              this.servers[server_name].details = serverDetails;
            resolve(true);
          } catch (e) {
            reject(e);
          }
        });
      });
    },
    executeMethod: function (server_name, method) {
      let endpoint = this.baseURL + `server/${server_name}/${method}`;
      return new Promise((resolve, reject) => {
        fetch(endpoint, {
          method: "POST",
        }).then(async (res) => {
          if (res.status == 200 || res.status == 304) resolve(true);
          else reject(res.status);
        });
      });
    },
    createServer: function (server_name, game_name) {
      let endpoint = this.baseURL + `server/create`;
      return new Promise((resolve, reject) => {
        fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({
            server_name: server_name,
            game_name: game_name,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }).then(async (res) => {
          if (res.status == 200) {
            resolve(await res.json());
          } else {
            reject(await res.json());
          }
        });
      });
    },
    deleteServer: function (server_name) {
      let endpoint = this.baseURL + `server/` + server_name;
      return new Promise((resolve, reject) => {
        fetch(endpoint, {
          method: "DELETE",
        }).then(async (res) => {
          if (res.status == 200) {
            resolve(await res.json());
            delete this.servers[server_name];
          } else {
            reject(await res.json());
          }
        });
      });
    },
    updateGameList: function () {
      if (this.gameList.length > 0) return; // don't load twice
      let endpoint = this.baseURL + `game/`;
      fetch(endpoint, {
        method: "GET",
      }).then(async (res) => {
        if (res.status == 200) {
          try {
            this.gameList = await res.json();
          } catch (e) {
            console.log("Error while loading game list");
          }
        }
      });
    },
    getGameIdentifier: function (game_full_name) {
      let game = this.gameList.find(
        (item) => item.game_full_name == game_full_name
      );
      return game ? game.game_name : undefined;
    }
  },
});

export default useAppStore;
