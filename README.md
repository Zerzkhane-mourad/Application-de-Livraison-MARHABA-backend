 1. On créer docker file
    
    FROM node:16
    WORKDIR /app
    COPY package.json .
    RUN npm install
    COPY . .
    EXPOSE 8080
    CMD ["npm","start"]

 2. On Créer un network, et on lui donner le nom de livraison-marhaba-net
 docker network create livraison-marhaba avec la commande : 

 - docker network create livraison-marhaba-net

3. On Executez un container basé sur l'image mongo, nommez-le livraison-marhaba-db avec le network livraison-marhaba-net avec la commande : 
 
 - docker container run -d --name livraison-marhaba-db -v livraison-marhaba-db:/data/db --network livraison-marhaba-net mongo

 4. On Entrer dans le dossier du serveur ou se trouver Dockerfile et on  creer cette image et nommez-la livraison-marhaba-docker:test avec la commande

 - docker build -t livraison-marhaba-docker:test .

 5. On Exécutez un container basé sur image livraison-marhaba-docker:test , on nommez livraison-marhaba on utiliser avec le network livraison-marhaba-net avec la commande :

 - docker container run -d --name livraison-marhaba-backend -v ${pwd}:/app -v /app/node_modules --network livraison-marhaba-net -p 8080:8080 livraison-marhaba-docker:test

<-----------------------TEST UNITAIRE---------------------->

1. installer les deux package jest , supertest

 - npm i --save-dev jest supertest

2. créer un fichier User.test.js et on fais test pour les fonctions de login

    const request = require('supertest')
    const app = require('../index');

    describe("  Login ",()=>{

        test("Email Not Found", async()=>{
            const res = await request(app).post('/signin').send({
                email:"cccc",
                password:"vvvvvvvvvvvv"

            })

            expect(res.statusCode).toBe(400);
        })

        test("Password Not Found", async()=>{
            const res = await request(app).post('/signin').send({
                email:"mouradzerzkhane@gmail.com",
                password:"2zégg1452"
            })

            expect(res.statusCode).toBe(400);
        })

        

        test("login success", async()=>{
            const res = await request(app).post('/signin').send({

                email: "mouradzerzkhane2000@gmail.com",
                password: "123456789"

            })

            expect(res.statusCode).toBe(200)
        })
        
    }) 

3. et on excuter notre test avec la commande : 

 - npm test 
