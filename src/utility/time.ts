export const localTime = (date: any) => {
  return date.toLocaleString('en-IN', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
}
export const getIndices = (date: any, index: number) => {
  let startIndex
  let endIndex
  const todaysDate = new Date()

  if (date.getDate() === todaysDate.getDate()) {
    startIndex = 0
    endIndex = 24 - todaysDate.getHours()
  } else {
    startIndex = 24 - todaysDate.getHours() + 24 * (index - 1)
    endIndex = startIndex + 24
  }
  return { startIndex, endIndex }
}
