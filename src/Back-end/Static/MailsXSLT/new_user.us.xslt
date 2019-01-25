<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
   <xsl:template match="/">
    <xsl:variable name="url" select="/body/href" />
   
      <html>
         <body style="background-color:#9E0B0F">
            <center>
               <table style="margin:2%;font-family: Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif;  ">
                  <tr>
                     <td height="30px">
                        <br />
                     </td>
                  </tr>
                  <tr>
                     <td width="3%" bgcolor="#9E0B0F" />
                     <td width="94%" bgcolor="#FFFFFF" style="padding:5%">
                        <div>
                           <hr style="border: 0;height: 1px;background-image: -webkit-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);   background-image: -moz-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);   background-image: -ms-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);   background-image: -o-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0); " />
                           <br />
                           <center>
                              <a href="{$url}">
							     <img style="width:15%" src="http://apptruth.pl/logo.png" />
                             
                              </a>
                              <br />
                              <br />
                           </center>
                           <hr style="border: 0;height: 1px;background-image: -webkit-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);   background-image: -moz-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);   background-image: -ms-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);   background-image: -o-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0); " />
                           <div style="text-align:left;padding-top:1px;padding-bottom:5px;padding-left:5px;padding-right:5px;">
                              <p style="font-size:14px">
                                 Hi
                                 <xsl:value-of select="body/name" />
                              </p>
                              <p style="font-size:12px">Thank you for creating an account. The website brings together people who want to meet other people with similar or identical passions.
                              This is where you can share your books, vinyl records and find another enthusiast who will be happy to talk to you and exchange experiences. </p>
                            
                              <br />
                              <p style="text-align:left">If you will have some problem with sign in please send mail to our support.
						I wish you to use this application with peace and happines :).</p>
                              <p style="text-align:left">
                                 Regards,
                                 <br />
                                 <strong>StuffShare Team</strong>
                              </p>
                           </div>
                        </div>
                     </td>
                     <td width="3%" bgcolor="#9E0B0F" />
                  </tr>
                  <tr>
                     <td height="50px" />
                  </tr>
               </table>
            </center>
         </body>
      </html>
   </xsl:template>
</xsl:stylesheet>