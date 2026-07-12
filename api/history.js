let history=[];


export default async function handler(req,res){


if(req.method==="POST"){

history.push(req.body);


return res.json({
success:true,
history
});

}



return res.json(history);


}
