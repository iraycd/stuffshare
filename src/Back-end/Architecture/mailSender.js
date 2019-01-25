// @ts-nocheck

import json2xml from "json2xml";
import fs from "fs";
import CONFIG from "./../config.js";
import nodemailer from "nodemailer";
import * as xsltProcess from "xslt-processor";
import ServerException from "./Exceptions/serverException.js";

export default class MailSender {
  constructor() {}

  /**
   *
   * @param  {any} { xslt_file, model, email_to, mail_title, language }
   * @return {void}@memberof MailSender
   */
  mailSend({ xslt_file, model, email_to, mail_title, language }) {
    let xslt = this.readXSLT({ xslt_file, language });
    let body = this.xsltToHtml({ xslt, xml: json2xml(model) });
    return this.send({ email_to, language, mail_title, body });
  }

  /**
   *
   * @param  {any} xslt_file
   * @param  {any} language
   * @return
   * @memberof MailSender
   */
  readXSLT({ xslt_file, language }) {
    return fs.readFileSync(`${CONFIG.PATH.mails}${xslt_file}.${language}.xslt`);
  }

  /**
   *
   * @param  {any} { xml, xslt }
   * @return
   * @memberof MailSender
   */
  xsltToHtml({ xml, xslt }) {
    let xmlResult = xsltProcess.xmlParse(xml);
    let xsltResult = xsltProcess.xmlParse(xslt.toString());
    let xsltHtml = xsltProcess.xsltProcess(xmlResult, xsltResult);
    return xsltHtml;
  }

  /**
   *
   * @param  {any} { email_to, language, mail_title, body }
   * @return {void}@memberof MailSender
   */
  async send({ email_to, language, mail_title, body }) {
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: CONFIG.SECURITY.SMTP,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: CONFIG.SECURITY.EMAIL.login, // generated ethereal user
        pass: CONFIG.SECURITY.EMAIL.password // generated ethereal password
      }
    });
    // setup email data with unicode symbols
    let mailOptions = {
      from: '" StuffShare" <postmaster@apptruth.pl>', // sender address
      to: email_to, // list of receivers
      subject: mail_title, // Subject line
      html: body
    };
    try {
      // send mail with defined transport object
      return await transporter.sendMail(mailOptions);
    } catch (ex) {
      console.log(ex);
      throw new ServerException().throw({
        type: "ERROR",
        code: "EMAIL_EXCEPTION",
        error: ex
      });
    }
  }
}

("use strict");

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
