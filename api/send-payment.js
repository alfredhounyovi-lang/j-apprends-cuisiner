export default async function handler(req, res) {

  try {

    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Method not allowed"
      });
    }

    const apiKey = process.env.PI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "PI_API_KEY manquante"
      });
    }


    const {
      wallet_address,
      amount
    } = req.body;


    if (!wallet_address) {
      return res.status(400).json({
        error: "Adresse wallet manquante"
      });
    }


    const paymentData = {

      payment: {

        amount: amount || 0.01,

        memo: "J'apprends à cuisiner - Testnet reward",

        metadata: {
          type: "test_reward",
          app: "J'apprends à cuisiner"
        },

        recipient_address: wallet_address

      }

    };


    const response = await fetch(
      "https://api.minepi.com/v2/payments",
      {
        method: "POST",

        headers: {
          "Authorization": `Key ${apiKey}`,
          "Content-Type": "application/json"
        },

        body: JSON.stringify(paymentData)
      }
    );


    const data = await response.json();


    if (!response.ok) {

      return res.status(response.status).json({
        ok:false,
        error:data
      });

    }


    return res.status(200).json({

      ok:true,
      payment:data

    });


  } catch(error) {

    console.error(error);

    return res.status(500).json({

      error:error.message

    });

  }

          }
