# fleetboard 

## Setup & Build instructions:

### Backend build
```
$ git clone https://github.com/ramganez/fleetboard.git
$ cd fleetboard
$ virtualenv venv # create virtualenv with python v - Python 3.8.10
$ source venv/bin/activate
$ pip install -r backend/requirements.txt
$ python backend/manage.py migrate
```
### Frontend build
```
# Node v16.17.0 and npm v8.15.0
$ cd frontend
$ npm install
```

## Demo

To examine the demos in your local build, execute below commands to setup the dummy data:
```
$ cd ../fleetboard
$ source venv/bin/activate
$ python backend/manage.py shell < backend/portal/dev_data_setup.py 
$ python backend/manage.py runserver localhost:8000 

$ cd frontend
$ npm start
```
and then browse to http://localhost:3000 use Merchant-ID - 'YVTE9ROHBUDVIB8' to login.
