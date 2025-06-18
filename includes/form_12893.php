<?php	
	if (empty($_POST['email16_12893']) && strlen($_POST['email16_12893']) == 0 || empty($_POST['email16_12893']) && strlen($_POST['email16_12893']) == 0 || empty($_POST['input_326_12893']) && strlen($_POST['input_326_12893']) == 0 || empty($_POST['input_2597']) && strlen($_POST['input_2597']) == 0 || empty($_POST['input_1947_12893']) && strlen($_POST['input_1947_12893']) == 0 || empty($_POST['input_2506']) && strlen($_POST['input_2506']) == 0)
	{
		return false;
	}
	
	$select_117 = $_POST['select_117'];
	$email16_12893 = $_POST['email16_12893'];
	$email16_12893 = $_POST['email16_12893'];
	$select_1155 = $_POST['select_1155'];
	$input_326_12893 = $_POST['input_326_12893'];
	$select_293 = $_POST['select_293'];
	$input_908 = $_POST['input_908'];
	$input_2280_12893 = $_POST['input_2280_12893'];
	$input_2597 = $_POST['input_2597'];
	$input_205 = $_POST['input_205'];
	$input_1947_12893 = $_POST['input_1947_12893'];
	$input_2949 = $_POST['input_2949'];
	$input_2417 = $_POST['input_2417'];
	$input_2506 = $_POST['input_2506'];
	$optin16_12893 = $_POST['optin16_12893'];
	
	$to = 'receiver@yoursite.com'; // Email submissions are sent to this email

	// Create email	
	$email_subject = "Message from a Blocs website.";
	$email_body = "You have received a new message. \n\n".
				  "Select_117: $select_117 \nEmail16_12893: $email16_12893 \nEmail16_12893: $email16_12893 \nSelect_1155: $select_1155 \nInput_326_12893: $input_326_12893 \nSelect_293: $select_293 \nInput_908: $input_908 \nInput_2280_12893: $input_2280_12893 \nInput_2597: $input_2597 \nInput_205: $input_205 \nInput_1947_12893: $input_1947_12893 \nInput_2949: $input_2949 \nInput_2417: $input_2417 \nInput_2506: $input_2506 \nOptin16_12893: $optin16_12893 \n";
	$headers = "MIME-Version: 1.0\r\nContent-type: text/plain; charset=UTF-8\r\n";	
	$headers .= "From: contact@yoursite.com\n";
	$headers .= "Reply-To: $input_2417";	
	
	mail($to,$email_subject,$email_body,$headers); // Post message
	return true;			
?>