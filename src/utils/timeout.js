export default (promise, ms = 5000) => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("Erro de conexão (timeout)"));
    }, ms);
    promise.then(resolve, reject);
  });
};
