export default async function handler(req,res){

if(req.method!=="POST"){
return res.status(405).json({
error:"Method not allowed"
});
}


try{


const {
paymentId
}=req.body;



const response = await fetch(

`https://api.minepi.com/v2/payments/${paymentId}/approve`,

{
method:"POST",

headers:{
"Authorization":`Key ${process.env.PI_API_KEY}`,
"Content-Type":"application/json"
}

}

);



const text = await response.text();


let data;

try{
data=JSON.parse(text);
}
catch{
data={raw:text};
}


return res.status(response.status).json(data);



}catch(error){

return res.status(500).json({
error:error.message
});

}

}
