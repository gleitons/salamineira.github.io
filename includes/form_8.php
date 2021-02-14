<?php	
	if (empty($_POST['prestador_de_servico']) && strlen($_POST['prestador_de_servico']) == 0 || empty($_POST['cpf_prestador']) && strlen($_POST['cpf_prestador']) == 0 || empty($_POST['endereco_do_prestador']) && strlen($_POST['endereco_do_prestador']) == 0 || empty($_POST['bairro_prestador']) && strlen($_POST['bairro_prestador']) == 0 || empty($_POST['name']) && strlen($_POST['name']) == 0 || empty($_POST['cep_prestador']) && strlen($_POST['cep_prestador']) == 0 || empty($_POST['nome_tomador']) && strlen($_POST['nome_tomador']) == 0 || empty($_POST['cpf_cnpj_tomador']) && strlen($_POST['cpf_cnpj_tomador']) == 0 || empty($_POST['endereco_tomador']) && strlen($_POST['endereco_tomador']) == 0 || empty($_POST['bairro_tomador']) && strlen($_POST['bairro_tomador']) == 0 || empty($_POST['name']) && strlen($_POST['name']) == 0 || empty($_POST['name']) && strlen($_POST['name']) == 0 || empty($_POST['descricao_nota_avulsa']) && strlen($_POST['descricao_nota_avulsa']) == 0 || empty($_POST['valor']) && strlen($_POST['valor']) == 0 || empty($_POST['email']) && strlen($_POST['email']) == 0 || empty($_POST['telefone']) && strlen($_POST['telefone']) == 0)
	{
		return false;
	}
	
	$prestador_de_servico = $_POST['prestador_de_servico'];
	$cpf_prestador = $_POST['cpf_prestador'];
	$endereco_do_prestador = $_POST['endereco_do_prestador'];
	$bairro_prestador = $_POST['bairro_prestador'];
	$name = $_POST['name'];
	$cep_prestador = $_POST['cep_prestador'];
	$nome_tomador = $_POST['nome_tomador'];
	$cpf_cnpj_tomador = $_POST['cpf_cnpj_tomador'];
	$endereco_tomador = $_POST['endereco_tomador'];
	$bairro_tomador = $_POST['bairro_tomador'];
	$name = $_POST['name'];
	$name = $_POST['name'];
	$descricao_nota_avulsa = $_POST['descricao_nota_avulsa'];
	$valor = $_POST['valor'];
	$email = $_POST['email'];
	$telefone = $_POST['telefone'];
	$optin8 = $_POST['optin8'];
	
	$to = 'receiver@yoursite.com'; // Email submissions are sent to this email

	// Create email	
	$email_subject = "Message from a Blocs website.";
	$email_body = "You have received a new message. \n\n".
				  "Prestador_De_Servico: $prestador_de_servico \nCpf_Prestador: $cpf_prestador \nEndereco_Do_Prestador: $endereco_do_prestador \nBairro_Prestador: $bairro_prestador \nName: $name \nCep_Prestador: $cep_prestador \nNome_Tomador: $nome_tomador \nCpf_Cnpj_Tomador: $cpf_cnpj_tomador \nEndereco_Tomador: $endereco_tomador \nBairro_Tomador: $bairro_tomador \nName: $name \nName: $name \nDescricao_Nota_Avulsa: $descricao_nota_avulsa \nValor: $valor \nEmail: $email \nTelefone: $telefone \nOptin8: $optin8 \n";
	$headers = "MIME-Version: 1.0\r\nContent-type: text/plain; charset=UTF-8\r\n";	
	$headers .= "From: contact@yoursite.com\n";
	$headers .= "Reply-To: $email";	
	
	mail($to,$email_subject,$email_body,$headers); // Post message
	return true;			
?>