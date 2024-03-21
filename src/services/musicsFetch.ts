const getMusics = async (id: string) => {
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
  const requestJson = await request.json();
  const finalData = requestJson.results

  return finalData;
};

export default getMusics;