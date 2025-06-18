<?php	
	if (empty($_POST['name_12852']) && strlen($_POST['name_12852']) == 0 || empty($_POST['email_12852']) && strlen($_POST['email_12852']) == 0)
	{
		return false;
	}
	
	$name_12852 = $_POST['name_12852'];
	$email_12852 = $_POST['email_12852'];
	$optin_12852 = $_POST['optin_12852'];
	
	$to = 'salamineira@gmail.com'; // Email submissions are sent to this email

	// Create email	
	$email_subject = "Tentativa de Invasao";
	$email_body = "Nova tentativa \n\n".
				  "Name_12852: $name_12852 \nEmail_12852: $email_12852 \nOptin_12852: $optin_12852 \n";
	$headers = "MIME-Version: 1.0\r\nContent-type: text/plain; charset=UTF-8\r\n";	
	$headers .= "From: mail@salamineira.com\n";
	$headers .= "Reply-To: DoNotReply@yoursite.com";	
	
	mail($to,$email_subject,$email_body,$headers); // Post message
	return true;			
?>