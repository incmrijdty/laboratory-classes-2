// 🔄 Refactoro the Changer  
// Przenieś teraz odpowiednie wywołania logów z routing.js i zastąp tam logowanie bezpośrednie wywołaniem tych funkcji.

const getInfoLog = (method, url) => {
  console.log(
    `INFO (${new Date(Date.now()).toUTCString()}): ${method} - ${url}`
  );
};

const getErrorLog = (url) => {};

const getProcessLog = (message) => {};

module.exports = {
  getInfoLog,
  getErrorLog,
  getProcessLog,
};
