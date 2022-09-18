import differenceInMinutes from 'date-fns/differenceInMinutes'


export const sincePosted = (timeStamp) => {
  const now = new Date()
  const before = new Date(timeStamp.seconds * 1000)

  let res = differenceInMinutes(now, before, ["ceil"])

  if (res <= 1) {
    res = "1 minute"
  } else if (res < 60) {
    res = res + " minutes"
  } else if (res < 120) {
    res = "1 hour";
  } else if (res < 60 * 24) {
    res = Math.floor(res / 60) + " hours"
  } else if (res < 60 * 24 * 2) {
    res = " 1 day"
  } else {
    res = Math.floor(res / (60 * 24)) + " days"
  }

  return res + " ago"

}