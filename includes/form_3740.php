<?php	
	if (empty($_POST['name_3740']) && strlen($_POST['name_3740']) == 0 || empty($_POST['email_3740']) && strlen($_POST['email_3740']) == 0 || empty($_POST['message_3740']) && strlen($_POST['message_3740']) == 0)
	{
		return false;
	}
	
	$name_3740 = $_POST['name_3740'];
	$email_3740 = $_POST['email_3740'];
	$email_3740 = $_POST['email_3740'];
	$message_3740 = $_POST['message_3740'];
	$optin_3740 = $_POST['optin_3740'];
	
	$to = 'receiver@yoursite.com'; // Email submissions are sent to this email

	// Create email	
	$email_subject = "Message from a Blocs website.";
	$email_body = "You have received a new message. \n\n".
				  "Name_3740: $name_3740 \nEmail_3740: $email_3740 \nEmail_3740: $email_3740 \nMessage_3740: $message_3740 \nOptin_3740: $optin_3740 \n";
	$headers = "MIME-Version: 1.0\r\nContent-type: text/plain; charset=UTF-8\r\n";	
	$headers .= "From: contact@yoursite.com\n";
	$headers .= "Reply-To: $email_3740";	
	
	mail($to,$email_subject,$email_body,$headers); // Post message
	return true;			
?>