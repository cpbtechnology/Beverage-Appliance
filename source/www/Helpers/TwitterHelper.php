<?php

	class TwitterHelper 
	{
		public static function tweet($post) 
		{	
			// Twitter Connection Info
			$twitter_access_token = '1337620152-t2s0aCswRvKMJB2W0enLlcEf16atj4eksAryItF';
			$twitter_access_token_secret = 'SsQjyYNjImufvdp0cT1kDpog0IO5dHU6trbf2lk';
			$twitter_consumer_key = 'aip3aGPNH7gIXnIx4FkNQ';
			$twitter_consumer_secret = '3v3kJMQJotqPsKguy0f8Sl7MG8Rspo3ewJWg3FEOU';

			// Connect to Twitter
			$connection = new TwitterOAuth($twitter_consumer_key, $twitter_consumer_secret, $twitter_access_token, $twitter_access_token_secret);

			// Post Update
			$tweet = $connection->post('statuses/update', array('status' => $post));
		}
	}
?>