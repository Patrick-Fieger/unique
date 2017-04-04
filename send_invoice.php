<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = strip_tags(trim($_POST["name"]));
		$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);


        if ( empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo "Beim senden Ihrer Nachricht ist ein Fehler unterlaufen, bitte versuchen sie es noch Einmal.";
            exit;
        }

        $recipient = "support@uniquept.de";

		$adresse = $_POST["adresse"];
		$plz = $_POST["plz"];
		$ort = $_POST["ort"];
		$pakete = $_POST["pakete"];
		$geb = $_POST["geb"];

		$subject = "Bestellung von von $name";
		$email_content = "Name: $name\n";
		$email_content .= "Email: $email\n\n";
		$email_content .= "Adresse:\n$adresse\n";
		$email_content .= "Geburtstag:\n$geb\n";
		$email_content .= "PLZ:\n$plz\n";
		$email_content .= "Ort:\n$ort\n";
		$email_content .= "Pakete:\n$pakete\n";

		$email_headers = "From: $name <$email>";

		if (mail($recipient, $subject, $email_content, $email_headers)) {
		    http_response_code(200);
		    // echo "Vielen Dank für deine Nachricht, ich werde mich so schnell wie möglich bei dir melden!";
		} else {
		    http_response_code(500);
		    //echo "Beim senden deiner Nachricht ist ein Fehler unterlaufen, bitte versuch es noch Einmal.";
		}

    }


 ?>