const getMedian = (arr: number[]) => {
  arr.sort((a, b) => a - b);
  if (arr.length % 2) {
    return arr[Math.floor(arr.length / 2)];
  } else {
    return (arr[arr.length / 2] + arr[arr.length / 2 - 1]) / 2;
  }
}

export default getMedian;
