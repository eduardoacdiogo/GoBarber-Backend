[ **Start the project** ](https://github.com/eduardoacdiogo/GoBarber-Backend/new/master?readme=1#start-the-project)<br>
[ **Run the project** ](https://github.com/eduardoacdiogo/GoBarber-Backend/new/master?readme=1#run-the-project)

# Start the project

## Clone de repository

## Install the dependency

`npm install / yarn`

## Create the container to your project

`docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres`

## Create the database to your server

> You can do this with in your program prefer, like DBeaver
> 

## Config the typeorm to make the connection with the database

`ormconfig.json`

## Run the migrations

`yarn typeorm migration:run`

# Run the project

## To start the server

`yarn dev:server`

## Some routers

### Appointments

- **List (get):**
    
    `localhost/appointments`
    
- **Create (post):**
    
    `localhost/appointments`
    

### Sessions

- **Create (post):**
    
    `localhost/sessions`
    
    ```json
    {
        "email": "andre1@hotmail.com",
        "password": "12345678"
    }
    ```
    

### Users

- **Create (post):**
    
    `localhost/users`
    
    ```json
    {
        "name": "Andre",
        "email": "andre1@hotmail.com",
        "password": "12345678"
    }
    ```
