<?php

/*$curl = curl_init();
$method = "";
$data = true;
$url = "https://api.lightspeedapp.com/API/V3/Account/256661/Customer.json";

switch ($method)
{
    case "POST":
        curl_setopt($curl, CURLOPT_POST, 1);

        if ($data)
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        break;
    case "PUT":
        curl_setopt($curl, CURLOPT_PUT, 1);
        break;
    default:
    	var_dump("PHP");
        if ($data)
            //$url = sprintf("%s?%s", $url, http_build_query($data));
        	$sendOutputToNodejs = "<html><body><h1>This html is sent from PHP to Node JS!</h1><h2>Try and experiment!</h2>";
			$sendOutputToNodejs .= "This is the output from PHP Script :: <br /><br />";
			$sendOutputToNodejs .= " First Name :" . sprintf("%s?%s", $url, http_build_query($data)) . "  <br /><br />";
			//$sendOutputToNodejs .= " Last Name :" . $argv[2] . "  <br /><br />";
			$sendOutputToNodejs .= "</body></html>";

			echo $sendOutputToNodejs;
}*/

	$raw_data = file_get_contents('https://api.lightspeedapp.com/API/V3/Account/256661/Customer.json');

	  // PHP just sees your data as a JSON string, so we'll decode it
	  $data = json_decode($raw_data, true);

	  // ... do stuff with your data
	  echo $data['someSortOfData']; // fromBluetoothHere

?>