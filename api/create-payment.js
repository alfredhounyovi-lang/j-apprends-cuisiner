export default async function handler(req,res){

if(req.method !== "POST"){
return res.status(405).json({
error:"Method not allowed"
});
}


try{

const {
paymentId,
recipient
}=req.body;


if(!paymentId){
return res.status(400).json({
error:"Missing paymentId"
});
}


// Ici on peut enregistrer le lien
// paymentId -> wallet destinataire
// dans une base de données plus tard


console.log(
"Payment:",
paymentId,
"Recipient:",
recipient
);


return res.status(200).json({

success:true,

paymentId,

recipient

});


}
catch(error){

return res.status(500).json({

error:error.message

});

}

}
