# Steps for deploying our web game to AWS EC2

## Project preparation

1. A copy version of our web game project and remove its packages.
2. Configure the web builder in **Program.cs** to expose the web game in port 8000 for production.
3. Change **server port (Startup.cs)** and **client port (all JavaScript files that have fetch requests to server)** from development to production.
4. Create a **seed script** so that you can initialize the database when you deploy.
5. Create a **Dockerfile** for the web game.
6. Create a **docker-compose** file so that you can easily combine the web game image, the PostgresSQL image and the seed script together then deploy it.
7. The port of the web game image in the **docker-compose** file should be point to **80** (default port of our AWS EC2 instance web server) so that the instance can display the web game if we deploy successfully.

## AWS EC2 Setup

1. From AWS Dashboard, we will choose EC2 service.
2. Choose **Launch instance** to start creating new instance for deploying our web game.
3. Choose the first option **Amazon Linux 2 (or another linux version that you prefer)**
4. You just only need to choose the **t2.micro (free tier)** then skip through all the instance next setup (because our project is simple and doesn't need it). But when you reach the **Configure Security Group** setup, you will also need to add rule for **HTTP** type with **Anywhere** source. Finally, click next and launch the instance.
5. Create and download new **key pair** of the instance (or choose an existing key pair if you have).
6. Create an Elastic IP for the instance.
7. Configure the **key pair** to connect and copy the web game project to the instance.

```
# Give your key pair permission to read and copy the project
chmod 400 key-pair-name.pem

# Copy the project to the AWS EC2 instance
scp -r -i key-pair-name.pem ~/path/to/your/project/folder/from/root ec2-user@instance-ip:~/

# Connect to the AWS EC2 instance
ssh -i key-pair-name.pem ec2-user@instance-ip
```

8. Install **Docker** and **docker-compose** for the instance.

```
sudo yum update
sudo yum install docker
sudo curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-`uname -s`-`uname -m` | sudo tee /usr/local/bin/docker-compose > /dev/null
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

9. Start **Docker**

```
sudo service docker start
```

10. Fire up the game!

```
cd online-web-game

# Run docker-compose in background
sudo docker-compose up --detach
```
