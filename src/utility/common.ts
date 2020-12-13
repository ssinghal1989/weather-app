export const getExtendedHourlyData = (array: Array<any>) => {
  let extendedArray: Array<any> = []
  for (let x = 0; x < 4; x++) {
    extendedArray = [...extendedArray, ...array]
  }
  return extendedArray
}
