<?php	
	if (empty($_POST['email_41570_9932_42134']) && strlen($_POST['email_41570_9932_42134']) == 0 || empty($_POST['email_41570_9932_42134']) && strlen($_POST['email_41570_9932_42134']) == 0 || empty($_POST['email_41570_9932_42134']) && strlen($_POST['email_41570_9932_42134']) == 0 || empty($_POST['email_41570_9932_42134']) && strlen($_POST['email_41570_9932_42134']) == 0 || empty($_POST['email_41570_9932_42134']) && strlen($_POST['email_41570_9932_42134']) == 0)
	{
		return false;
	}
	
	$optin_41570_9932_42134 = $_POST['optin_41570_9932_42134'];
	$input_826_41570_9932_42134 = $_POST['input_826_41570_9932_42134'];
	$input_2768_41570_9932_42134 = $_POST['input_2768_41570_9932_42134'];
	$input_310_41570_9932_42134 = $_POST['input_310_41570_9932_42134'];
	$email_41570_9932_42134 = $_POST['email_41570_9932_42134'];
	$email_41570_9932_42134 = $_POST['email_41570_9932_42134'];
	$email_41570_9932_42134 = $_POST['email_41570_9932_42134'];
	$email_41570_9932_42134 = $_POST['email_41570_9932_42134'];
	$email_41570_9932_42134 = $_POST['email_41570_9932_42134'];
	$input_382_41570_9932_42134 = $_POST['input_382_41570_9932_42134'];
	
	$to = 'receiver@yoursite.com'; // Email submissions are sent to this email

	// Create email	
	$email_subject = "Message from a Blocs website.";
	$email_body = "You have received a new message. \n\n".
				  "Optin_41570_9932_42134: $optin_41570_9932_42134 \nInput_826_41570_9932_42134: $input_826_41570_9932_42134 \nInput_2768_41570_9932_42134: $input_2768_41570_9932_42134 \nInput_310_41570_9932_42134: $input_310_41570_9932_42134 \nEmail_41570_9932_42134: $email_41570_9932_42134 \nEmail_41570_9932_42134: $email_41570_9932_42134 \nEmail_41570_9932_42134: $email_41570_9932_42134 \nEmail_41570_9932_42134: $email_41570_9932_42134 \nEmail_41570_9932_42134: $email_41570_9932_42134 \nInput_382_41570_9932_42134: $input_382_41570_9932_42134 \n";
	$headers = "MIME-Version: 1.0\r\nContent-type: text/plain; charset=UTF-8\r\n";	
	$headers .= "From: contact@yoursite.com\n";
	$headers .= "Reply-To: $email_41570_9932_42134";	
	
	mail($to,$email_subject,$email_body,$headers); // Post message
	return true;			
?>