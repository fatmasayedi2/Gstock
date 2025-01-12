# Utilise l'image officielle Node.js
FROM node:16

# Répertoire de travail
WORKDIR /usr/src/app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste de l'application
COPY . .

# Exposer le port sur lequel l'application fonctionne
EXPOSE 3001

# Démarrer l'application avec nodemon
CMD ["npm", "run", "server"]
