<?php
	class Ingredients 
	{
		public $list;

		public function __construct($jsonString) {

			$this->list = array();

			$json = json_decode($jsonString, true);
			
			if($json === false || $json === null){
				return false;
			}

			foreach ($json as $ingredient) {
			    $ingredientObject = new Ingredient($ingredient);
			    $this->list[$ingredientObject->id] = $ingredientObject;
			}

			return true;
		}
	}

	class Ingredient 
	{
		public $name;
		public $pin;
		public $id;

		public function __construct($array) {

			$this->name = $array['name'];
			$this->pin = $array['pin'];
			$this->id = $array['id'];
		}
	}
?>