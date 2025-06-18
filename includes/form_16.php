<?php	
	if (empty($_POST['email16']) && strlen($_POST['email16']) == 0 || empty($_POST['email16']) && strlen($_POST['email16']) == 0 || empty($_POST['input_326']) && strlen($_POST['input_326']) == 0 || empty($_POST['input_1947']) && strlen($_POST['input_1947']) == 0)
	{
		return false;
	}
	
	$select_117 = $_POST['select_117'];
	$email16 = $_POST['email16'];
	$email16 = $_POST['email16'];
	$select_1155 = $_POST['select_1155'];
	$input_326 = $_POST['input_326'];
	$select_293 = $_POST['select_293'];
	$input_2280 = $_POST['input_2280'];
	$select_1502 = $_POST['select_1502'];
	$select_1833 = $_POST['select_1833'];
	$input_1947 = $_POST['input_1947'];
	$select_1064 = $_POST['select_1064'];
	$optin16 = $_POST['optin16'];
	
	$to = 'receiver@yoursite.com'; // Email submissions are sent to this email

	// Create email	
	$email_subject = "Message from a Blocs website.";
	$email_body = "You have received a new message. \n\n".
				  "Select_117: $select_117 \nEmail16: $email16 \nEmail16: $email16 \nSelect_1155: $select_1155 \nInput_326: $input_326 \nSelect_293: $select_293 \nInput_2280: $input_2280 \nSelect_1502: $select_1502 \nSelect_1833: $select_1833 \nInput_1947: $input_1947 \nSelect_1064: $select_1064 \nOptin16: $optin16 \n";
	$headers = "MIME-Version: 1.0\r\nContent-type: text/plain; charset=UTF-8\r\n";	
	$headers .= "From: contact@yoursite.com\n";
	$headers .= "Reply-To: DoNotReply@yoursite.com";	
	
	mail($to,$email_subject,$email_body,$headers); // Post message
	return true;			
?>