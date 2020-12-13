const get = async () => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      return navigator.geolocation.getCurrentPosition(
        function success (data) {
          resolve(data)
        },
        function error (error) {
          reject(error)
        }
      )
    } else {
      reject(new Error('No location provider'))
    }
  })
}

const locationUtility = {
  get
}

export default locationUtility
