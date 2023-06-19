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


					