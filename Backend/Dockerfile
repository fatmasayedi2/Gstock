# Utilise l'image officielle Node.js
FROM node:16

# Répertoire de travail
WORKDIR /usr/src/app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Installer nodemon en tant que dépendance de développement (si nécessaire)
RUN npm install --save-dev nodemon

# Copier le reste de l'application
COPY . .

# Exposer le port sur lequel l'application fonctionne
EXPOSE 3002  

# Démarrer l'application avec nodemon (si configuré dans package.json)
CMD ["npm", "run", "server"]
