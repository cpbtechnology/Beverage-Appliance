<?php
	$view = $_GET['action'];

	switch ($view) 
	{
		case 'index':
			require_once('../Models/Ingredients.php');
			require_once('../Models/Recipes.php');

			$availableIngredientsJSON = file_get_contents("../Data/ingredients.json");
			$availableIngredients = new Ingredients($availableIngredientsJSON);

			$recipesJSON = file_get_contents("../Data/recipes.json");
			$recipes = new Recipes($recipesJSON, $availableIngredients);

			include('../Views/Index.php');
			break;
	}
?>