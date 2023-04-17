const {Router} = require('express')
const mercadopago = require('mercadopago')
require('dotenv').config()

let token = process.env.ACCES_TOKEN_MP

mercadoRouter = Router()

mercadoRouter.post('/', async (req, res) => {
    
    mercadopago.configure({
        access_token: token
    })

    //declaro la preferencia
    let preference = {
        items: [
            {
                title: "Dummy Item",
                description: "Multicolor Item",
                currency_id: "$",
                quantity: 1,
                unit_price: 10
            }
        ],
        back_urls: {
			"success": "http://localhost:3001/pagar/feedback",
			"failure": "http://localhost:3001/pagar/feedback",
			"pending": "http://localhost:3001/pagar/feedback"
		},
		auto_return: "approved",
    }

    await mercadopago.preferences.create(preference)
    .then((r) =>  {
        console.log(r.body)
        let preferenceId = r.body.id
        res.status(200).send(preferenceId)
    }) 
    .catch((err) => console.log(err))

})

mercadoRouter.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});

module.exports = mercadoRouter