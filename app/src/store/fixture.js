// Example response from Paypal

export default
{
  "create_time": "2020-10-01T15:25:56Z",
  "update_time": "2020-10-01T15:27:21Z",
  "id": "4H0435455H817614W",
  "intent": "CAPTURE",
  "status": "COMPLETED",
  "payer": {
    "email_address": "milan.bargiel+buyer@googlemail.com",
    "payer_id": "GEYWHK4GX9XEE",
    "address": {
      "country_code": "DE"
    },
    "name": {
      "given_name": "Willi",
      "surname": "Käufer"
    }
  },
  "purchase_units": [
    {
      "description": "1 x Sebastian Osterhaus: Von der Rolle - Nudelgold – Einkauf über kulturgenerator.de",
      "reference_id": "default",
      "amount": {
        "value": "71.25",
        "currency_code": "EUR",
        "breakdown": {
          "item_total": {
            "value": "65.00",
            "currency_code": "EUR"
          },
          "shipping": {
            "value": "3.00",
            "currency_code": "EUR"
          },
          "handling": {
            "value": "0.00",
            "currency_code": "EUR"
          },
          "tax_total": {
            "value": "3.25",
            "currency_code": "EUR"
          },
          "insurance": {
            "value": "0.00",
            "currency_code": "EUR"
          },
          "shipping_discount": {
            "value": "0.00",
            "currency_code": "EUR"
          }
        }
      },
      "payee": {
        "email_address": "luciano.karuso+paypal1@googlemail.com",
        "merchant_id": "QN2EP7FSG539J"
      },
      "items": [
        {
          "name": "Sebastian Osterhaus: Von der Rolle - Nudelgold",
          "unit_amount": {
            "value": "65.00",
            "currency_code": "EUR"
          },
          "tax": {
            "value": "0.00",
            "currency_code": "EUR"
          },
          "quantity": "1"
        }
      ],
      "shipping": {
        "name": {
          "full_name": "Willi Käufer"
        },
        "address": {
          "address_line_1": "ESpachstr. 1",
          "admin_area_2": "Freiburg",
          "admin_area_1": "Baden-Württemberg",
          "postal_code": "79111",
          "country_code": "DE"
        }
      },
      "payments": {
        "captures": [
          {
            "status": "COMPLETED",
            "id": "9V413870NM5733030",
            "final_capture": true,
            "create_time": "2020-10-01T15:27:21Z",
            "update_time": "2020-10-01T15:27:21Z",
            "amount": {
              "value": "71.25",
              "currency_code": "EUR"
            },
            "seller_protection": {
              "status": "ELIGIBLE",
              "dispute_categories": [
                "ITEM_NOT_RECEIVED",
                "UNAUTHORIZED_TRANSACTION"
              ]
            },
            "links": [
              {
                "href": "https://api.sandbox.paypal.com/v2/payments/captures/9V413870NM5733030",
                "rel": "self",
                "method": "GET",
                "title": "GET"
              },
              {
                "href": "https://api.sandbox.paypal.com/v2/payments/captures/9V413870NM5733030/refund",
                "rel": "refund",
                "method": "POST",
                "title": "POST"
              },
              {
                "href": "https://api.sandbox.paypal.com/v2/checkout/orders/4H0435455H817614W",
                "rel": "up",
                "method": "GET",
                "title": "GET"
              }
            ]
          }
        ]
      }
    }
  ],
  "links": [
    {
      "href": "https://api.sandbox.paypal.com/v2/checkout/orders/4H0435455H817614W",
      "rel": "self",
      "method": "GET",
      "title": "GET"
    }
  ]
}