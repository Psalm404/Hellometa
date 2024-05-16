const JWT = process.env.VUE_APP_PINATA_JWT;

export async function uploadFileToIPFS(file) {
    try{
        const formData = new FormData();
        formData.append('file',file.raw);
        console.log(file.raw);  //debug
        alert(JWT);  //debug

        const pinataMetadata = JSON.stringify({
            name: file.name,
            keyvalues: {
                author: 'Clion Pendragon',  //need to change
            }
        });
        formData.append('pinataMetadata', pinataMetadata);

        const pinataOptions = JSON.stringify({
            cidVersion: 0,
        });
        formData.append('pinataOptions', pinataOptions);

        const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${JWT}`,
            },
            body: formData,
        });
        const resData = await res.json();
        if(resData.error !== undefined){
            return{
                success:false,
                message: resData.error,
            }
        }else{
            const IpfsHash = resData.IpfsHash;
            console.log('upload response 1=========='); //debug
            console.log(resData);  //debug        
            return {
                success: true,
                pinataURL: "https://brown-urban-hornet-311.mypinata.cloud/ipfs/" + IpfsHash
            }            
        }

    } catch (error) {
        console.log('upload response 2==========');  //debug
        console.error(error);  //debug
        return {
            success: false,
            message: error.message,
        }
    }
}

export async function uploadJSONToIPFS(JSONbody) {
    try{
        alert(JSON.stringify(JSONbody, null, 2));
        // Convert JSON to a string and then to a Blob
        const jsonBlob = new Blob([JSON.stringify(JSONbody, null, 2)], { type: 'application/json' });
        const formData = new FormData();
        
        formData.append('file',jsonBlob);

        const pinataMetadata = JSON.stringify({
            name: JSONbody.name + 'nftJSON',
            keyvalues: {
                author: 'Clion Pendragon',  //need to change
            }
        });
        formData.append('pinataMetadata', pinataMetadata);

        const pinataOptions = JSON.stringify({
            cidVersion: 0,
        });
        formData.append('pinataOptions', pinataOptions);

        const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${JWT}`,
            },
            body: formData,
        });
        const resData = await res.json();
        if(resData.error !== undefined){
            return{
                success:false,
                message: resData.error,
            }
        }else{
            const IpfsHash = resData.IpfsHash;
            console.log('upload response 1=========='); //debug
            console.log(resData);  //debug        
            return {
                success: true,
                pinataURL: "https://brown-urban-hornet-311.mypinata.cloud/ipfs/" + IpfsHash
            }            
        }

    } catch (error) {
        console.log('upload response 2==========');  //debug
        console.error(error);  //debug
        return {
            success: false,
            message: error.message,
        }
    }
}
