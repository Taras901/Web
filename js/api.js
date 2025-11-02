const Resource_url = "http://127.0.0.1:5000";

const baseRequest = async ({urlpath = '', method = 'GET', body = null}) => {
    try {
        const reqParams ={
            method, 
            headers:{
                'Content-Type':'application/json'
            },
        };

        if(body) {
            reqParams.body = JSON.stringify(body)
        }
        
        const response = await fetch(`${Resource_url}${urlpath}`, reqParams );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
        
    } catch(error) {
        console.error("API Request Failed:", error);
        throw error;
    }
}

export const getAllHelicopters = async () => {
    const Rawres = await baseRequest ({urlpath: '/helicopters', method: 'GET'});
    return Rawres.json();  
}

export const createHelicopter = async (data) => {
    const Rawres = await baseRequest({ urlpath: '/helicopters', method: 'POST', body: data });
    return Rawres.json();
}

export const updateHelicopter = async (id, data) => {
    const Rawres = await baseRequest({ urlpath: `/helicopters/${id}`, method: 'PUT', body: data });
    return Rawres.json();
}

export const deleteHelicopter = async (id) => {
    await baseRequest({ urlpath: `/helicopters/${id}`, method: 'DELETE' });
    return true;
}