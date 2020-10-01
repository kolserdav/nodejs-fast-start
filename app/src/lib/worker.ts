class Worker {
  constructor() {}

  request(url: string, data: {}) {
    return new Promise((resolve, reject) => {
      fetch(url, data)
        .then(r => r.json())
        .then(d => {
          resolve(d);
        })
        .catch(e => {
          reject(e);
        })
    })
      .catch(e => {
        console.error(e);
      })
  }
}

export default Worker;