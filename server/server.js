const express = require('express');
const session = require('express-session');
const app = express();
axios = require('axios');
massive = require('massive');
require('dotenv').config();


const { SERVER_PORT, REACT_APP_DOMAIN, REACT_APP_CLIENT_ID, CLIENT_SECRET, SESSION_SECRET, CONNECTION_STRING} = process.env;
massive(CONNECTION_STRING).then(db =>{
    app.set('db', db)
})

app.use(session ({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
//db calls
// put user data on req.session obj
//req.session.user = responseFromDb
//req.session{email, pic etc}

app.get('/auth/callback', async (req, res) => {
    //req.query.code--> code from auth0
    //http:localhost:3005/auth/callback?code=hfj34834673yh
    //req.query = {code: hfj348... see above}
    let payload ={
        client_id:REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://${req.headers.host}/auth/callback`//diff way of referencing 3000 just hover on debugger
    }
    //now we use the 'code we got' to get a token

    let resWithToken= await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload)
    //we get token here, must be used soon b4 expire and use it to get user info for whoever logs in
    // console.log(resWithToken.data.access_token);

    

    let resWithUserData = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${resWithToken.data.access_token}`)
    // console.log(resWithUserData.data);
    const db = req.app.get('db')
    let {sub, email, name, picture} = resWithUserData.data
    let foundUser = await db.find_user([sub])//we are using async here instead of .then
    if(foundUser[0]){
        req.session.user = foundUser[0]//put on session obj if found
        res.redirect('/#/private')//this slash used here is the same as putting http://localhost3000/ in the brackets we are just not hard coding here
    } else{
       let createdUser=  await db.create_user([name, email, sub, picture])//if not found we create then add to session
       req.session.user = createdUser[0]
       res.redirect('/#/private')//this slash used here is the same as putting http://localhost3000/ in the brackets we are just not hard coding here

    }//checking to see if truthy or falsy. if truthy, someone was found in our db

});

app.get('/api/user_data', (req, res) => {
    if(req.session.user){
        res.status(200).send(req.session.user)
    } else {
        res.status(401).send('Nice try, not authorized')
    }

});
app.get('/api/logout', (req, res) => { //to obliterate session
    req.session.destroy();
    res.send()//also sends a 200 by default
})




app.listen(SERVER_PORT, () => {
    console.log(`listening on port: ${SERVER_PORT}`);

})
