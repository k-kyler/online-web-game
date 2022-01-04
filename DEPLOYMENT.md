# Steps for deploying our web game to AWS EC2

## Project preparation

1. A copy version of our web game project and remove its packages.
2. Configure the web builder in **Program.cs** to expose the web game in port 80 for production.
3. Change **server port (Startup.cs)** and **client port (all JavaScript files that have fetch requests to server)** from development to production.
4. Create a **seed script** so that you can initialize the database when you deploy.
5. Create a **Dockerfile** for the web game.
6. Create a **docker-compose** so that you can easily combine the web game image, the PostgresSQL image and the seed script together then deploy it.

## AWS EC2 Setup

1. From AWS Dashboard, we will choose EC2 service.
2. Choose **Launch instance** to start creating new instance for deploying our web game.
3. Choose the first option **Amazon Linux 2 (or another linux version that you prefer)**
4. You just only need to choose the **t2.micro (free tier)** then skip through all the instance next setup (because our project is simple and doesn't need it). But when you reach the **Configure Security Group** setup, you will also need to add rule for **HTTP** type with **Anywhere** source. Finally, click next and launch the instance.
5. Create and download new **key pair** of the instance.
6. Configure the **key pair** to connect and copy the web game project to the instance.
7. Install **Docker** and **docker-compose** for the instance.

```
sudo yum update
sudo yum install docker
sudo curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-`uname -s`-`uname -m` | sudo tee /usr/local/bin/docker-compose > /dev/null
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

8. Start **Docker**

```
sudo service docker start
```

9. Run the web game

```
cd online-web-game
sudo docker-compose up
```
