<?php
	class Recipes 
	{
		public $list;

		public function __construct($jsonString, $availableIngredients) {

			$this->list = array();

			$json = json_decode($jsonString, true);
			
			if($json === false || $json === null){
				return false;
			}

			foreach ($json as $recipe) {
			    $recipeObject = new Recipe($recipe, $availableIngredients);
			    $this->list[$recipeObject->id] = $recipeObject;
			}

			return true;
		}
	}

	class Recipe 
	{
		public $name;
		public $id;
		public $ingredients;
		public $canBeServed;
		public $ingredientsString;
		public $makeDrinkPinsToSeconds;

		public function __construct($array, $availableIngredients) 
		{

			$this->name = $array['name'];
			$this->id = $array['id'];
			$this->ingredients = $array['ingredients'];

			$this->calculateOtherClassVariables($availableIngredients);
		}

		public function calculateOtherClassVariables($availableIngredients) 
		{

            $string = '';
            $this->canBeServed = true;

            $pinsToSecondsArray = array();

            foreach ($this->ingredients as $ingredient) 
            {
            	if (isset($availableIngredients->list[$ingredient['id']])) 
            	{
            		$ingredientObject = $availableIngredients->list[$ingredient['id']];

                	$string = $string . $ingredientObject->name . ', ';
                	$pinsToSecondsArray[$ingredientObject->pin] = $ingredient['amount']* 29.5735 * 0.04; 
                	// convert from ounces to ml = *29.5735
                	// convert from ml to seconds needed in solenoid = *0.04
                }
                else 
                {
                	$this->canBeServed = false;
                }
            }

            $string = substr($string, 0, -2); 

            $this->ingredientsString = $string;
            $this->makeDrinkPinsToSeconds = $pinsToSecondsArray;
		}
	}
?>