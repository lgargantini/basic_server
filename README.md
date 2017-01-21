Test - Circular Primes 

### Install Node JS

		sudo apt-get update
		sudo apt-get install -y python-software-properties python g++ make
		sudo add-apt-repository ppa:chris-lea/node.js
		sudo apt-get update
		sudo apt-get install nodejs

### Install Nodemon
		
		#issue: "Error: watch ENOSPC"
		echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

		#npm install nodemon -g

### Run server

		#npm install
		#npm start
