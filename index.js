import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "billgates";
const yourPassword = "money";
 const yourAPIKey = "6829365d-26d7-4255-86d6-d4d661e2523c"; /**9044d61f-7f97-46a6-b816-a89907576839*/
const yourBearerToken = "fddfd81a-c0d6-417f-81ba-9578c7b2460d";/*""*/

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  
 try{
    const result = await axios.get(API_URL + "/random");
  res.render("index.ejs",{ content : JSON.stringify(result.data)})

 }catch(error){
     
    res.status(404).send(error.message);
 }

});

app.get("/basicAuth", async (req, res) => {
  
   try{ 
    const result = await axios.get( API_URL + "/all?page=1",{
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    }
    );
        res.render("index.ejs", { content: JSON.stringify(result.data)});
   }catch( error ){
    res.status(404).send(error.message);
   }

});

app.get("/apiKey", async(req, res) => {

  try{
    const result = await axios.get(API_URL + "/filter",{
      params: { score: 5,
                apiKey: yourAPIKey}
    });
    res.render("index.ejs",{content: JSON.stringify(result.data) });
  }catch( error ){
    res.status(400).send(error.message);
  }

});

app.get("/bearerToken", async(req, res) => {
  
  try{
    const result = await axios.get(API_URL + "/secrets/1",{
    headers:{ 
      Authorization: `Bearer ${yourBearerToken}`,
    }
  });
  res.render("index.ejs",{ content: JSON.stringify(result.data)});
  }catch(error){
 res.status(404).send(error.message);
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


