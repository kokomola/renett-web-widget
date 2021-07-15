const host = 'https://renett.botlify.io';

export const getNetts = async (order, spheres, url, skip = 0) => {
    const sphereQuery = spheres.map(sp => `&spheres[]=${sp.title}`).join('');
    const headers = {'content-type': 'application/json'};
    const response = await fetch(`${host}/netts?order=${order}${sphereQuery}&skip=${skip}&url=${url}`, {
      method: 'get',
      headers,
    });
    const json = await response.json();
  
    return {data: json.data, status: response.status};
  };