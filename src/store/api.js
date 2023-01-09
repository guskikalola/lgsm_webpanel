// Utilities
import { defineStore } from "pinia";

const useAppStore = defineStore("api", {
  state: () => ({
    servers: {},
    baseURL: "http://localhost:8000/api/v1/",
  }),
  getters: {},
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
      return new Promise((resolve,reject) => {
        fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({
            "server_name":server_name,
            "game_name":game_name
          }),
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(async res => {
          if(res.status == 200) {
            resolve(await res.json())
          } else {
            reject(await res.json());
          }
        })
      });
    }
  },
});

export default useAppStore;
