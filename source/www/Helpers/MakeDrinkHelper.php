<?php

	class MakeDrinkHelper 
	{
		public static function makeDrink($drinkId) 
		{

			$availableIngredientsJSON = file_get_contents("../../Data/ingredients.json");
			$availableIngredients = new Ingredients($availableIngredientsJSON);

			$recipesJSON = file_get_contents("../../Data/recipes.json");
			$recipes = new Recipes($recipesJSON, $availableIngredients);

			$orderedRecipe = $recipes->list[$drinkId];

			$GPIOScriptsDir = '/home/Projects/autobartender/pi/source/www/Libraries/php-gpio/';

			// Testing
			// $command = 'sudo php ' . $GPIOScriptsDir . 'test.php';
			// $response = exec($command);

			// var_dump($orderedRecipe);	

			foreach ($orderedRecipe->makeDrinkPinsToSeconds as $pin => $seconds) 
			{
				//echo 'pin: ' . $pin . ', seconds: ' . $seconds;
				$command = 'sudo php ' . $GPIOScriptsDir . 'pinController.php ' . $pin . ' ' . $seconds;			
				$response = exec($command);
			}	

			TwitterHelper::tweet("Just made a new " . $orderedRecipe->name . " #pitender #party #drunk " . time());
		}
	}
?>