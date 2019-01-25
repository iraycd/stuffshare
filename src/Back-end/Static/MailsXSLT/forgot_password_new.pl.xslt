<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
   <xsl:template match="/">
      <xsl:variable name="url" select="/body/href" />
   
    <xsl:variable name="password" select="/body/password" />
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
                                 Cześć
                                 <xsl:value-of select="body/name" />
                              </p>
                              <p style="font-size:12px">
                                W tym mailu przesylamy nowo wygenerowane haslo.
                                Teraz bez problemów powinienes móc zalogować się na konto w stuffShare i poznawać ludzi z taka sama pasją jak Ty.
                                </p>
                             <center><strong><br/><span style="font-size:16px; background-color:#9E0B0F;color:white;padding-top:2px;padding-bottom:2px;padding-left:10px;padding-right:10px;border-radius:2px;text-decoration: none;font-weight:100">
                                 <xsl:value-of select="body/password"/>
                              </a></strong></center>
                              <br />
                                 <p style="text-align:left">Jeżeli napotkasz jakies problemy, śmialo pisz do naszego supportu.
						Życzymy przyjemnego korzystania z serwisu :).</p>
                              <p style="text-align:left">
                                 Pozdrawiamy,
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