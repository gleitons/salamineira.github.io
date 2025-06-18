<?php	
	if (empty($_POST['name10']) && strlen($_POST['name10']) == 0 || empty($_POST['email10']) && strlen($_POST['email10']) == 0 || empty($_POST['message']) && strlen($_POST['message']) == 0)
	{
		return false;
	}
	
	$name10 = $_POST['name10'];
	$email10 = $_POST['email10'];
	$message = $_POST['message'];
	$optin10 = $_POST['optin10'];
	
	$to = 'receiver@yoursite.com'; // Email submissions are sent to this email

	// Create email	
	$email_subject = "Message from a Blocs website.";
	$email_body = "You have received a new message. \n\n".
				  "Name10: $name10 \nEmail10: $email10 \nMessage: $message \nOptin10: $optin10 \n";
	$headers = "MIME-Version: 1.0\r\nContent-type: text/plain; charset=UTF-8\r\n";	
	$headers .= "From: contact@yoursite.com\n";
	$headers .= "Reply-To: $email10";	
	
	mail($to,$email_subject,$email_body,$headers); // Post message
	return true;			
?>