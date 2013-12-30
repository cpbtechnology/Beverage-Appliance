<?php

	if (isset($_POST['action'])) {
		$action = $_POST['action'];
	}

	switch ($action) 
	{
		case 'make-drink':

			require_once('../../Models/Ingredients.php');
			require_once('../../Models/Recipes.php');
			require_once('../../Helpers/MakeDrinkHelper.php');
			require_once('../../Helpers/TwitterHelper.php');
			require_once('../../Libraries/twitteroauth/twitteroauth.php');

			$drinkId = $_REQUEST['drinkId'];			
			MakeDrinkHelper::makeDrink($drinkId);

			$response = array('status'=>'success',
						 	  'drinkId'=>$drinkId);

    		echo json_encode($response);

			break;
	}
?>