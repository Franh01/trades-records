export const generateID = (): string => {
  //Obtain actual time in milliseconds
  const timestamp = Date.now().toString(36)
  //Generate a random number and transform it to base 36
  const randomNum = Math.random().toString(36).substring(2, 10)

  //Concatenate timestamp and random number
  return `${timestamp}-${randomNum}`
}
