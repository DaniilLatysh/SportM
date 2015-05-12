         var to = "daniil.latysh@yandex.ru";  
         var subj = "тема письма";  
         var text = "собственно тело письма";  
 
SendMail(to, subj, text, ["c:\\1.txt"]); 
 
 
function SendMail(sRecipientMail, sSubject, sMsgBody,files)   
{   
    try   
    {   
        // create a session and log on -- username and password in profile    
        var refMsg = WScript.CreateObject("CDO.Message");   
        var refConf = WScript.CreateObject("CDO.Configuration");   
           
        // Setting configuration params   
        with(refConf.Fields)   
        {   
            Item("http://schemas.microsoft.com/cdo/configuration/smtpserver") = "smtp.mail.ru";  
            Item("http://schemas.microsoft.com/cdo/configuration/sendusing") = 2; 
            Item("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate") = 1;  
            Item("http://schemas.microsoft.com/cdo/configuration/sendusername") = "lou@list.ru";  
            Item("http://schemas.microsoft.com/cdo/configuration/sendpassword") = "****"; 
        }   
        refConf.Fields.Update();   
   
        with(refMsg)   
        {   
            Configuration = refConf;   
            To       = sRecipientMail;   
            From     = "lou@list.ru";   
            Subject  = sSubject;   
            TextBody = sMsgBody;   
        }  
  
        if (files)  
        {  
            for(var i=0; i<files.length; i++)  
                refMsg.AddAttachment(files[i]);  
        }  
  
        refMsg.Send();   
    }    
    catch(e)   
    {   
        WScript.Echo("SendMail error !!! : " + e.description);   
        WScript.Quit(1);   
    }   
}