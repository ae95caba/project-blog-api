signup page
			if 200
					creates user 
					loads loginform/ alerts "done"
			else 
					displays error

login page
		request token
				if 200
						saves it to localstorage
						renders main page
				else
						display error message
				
main page
	request posts using token
			if 200
					displays content
			else	
					displays error message


					////////////////////////////

					when the user signs if the user match, a token is saved to
					 local storage and user is set to online


						when page loads useEffect runs checking validity of
						 localstorage token if any,