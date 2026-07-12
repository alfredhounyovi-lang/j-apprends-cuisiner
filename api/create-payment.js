export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }


  try {

    const {
      amount,
      recipient
    } = req.body;


    if (!process.env.PI_API_KEY) {
      return res.status(500).json({
        error:"Missing PI_API_KEY"
      });
    }


    const response = await fetch(
      "https://api.minepi.com/v2/payments",
      {
        method:"POST",
        headers:{
          "Authorization":`Key ${process.env.PI_API_KEY}`,
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          payment:{
            amount:Number(amount),

            memo:"Testnet reward",

            metadata:{
              recipient:recipient
            }

          }

        })

      }
    );


    const data = await response.json();


    return res.status(200).json(data);


  } catch(error){

    return res.status(500).json({
      error:error.message
    });

  }

}
