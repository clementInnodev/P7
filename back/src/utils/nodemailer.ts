/* import nodemailer from "nodemailer"
import sendgridTransport from "nodemailer-sendgrid"

const transport = nodemailer.createTransport(
    sendgridTransport({
        apiKey: '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'
    })
)

export default transport */

import { createTransport } from "nodemailer"

export const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
      user: 'Groupomania@outlook.fr',
      pass: 'Group1!omania'
    }
})