export function delayPromise() {
    console.log("inside promiser");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Promise resolved after 2 seconds');
      }, 2000); 
    });
  }