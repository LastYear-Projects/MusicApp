const getToken = async ()=>{
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorizations': 'Basic' + btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials&client_id=38e67659f07443c3be7ebf8f88362892&client_secret=627725320547433196284da785fcb187'
    });
    const data = await result.json();
    return data.access_token;
}

module.exports = getToken;