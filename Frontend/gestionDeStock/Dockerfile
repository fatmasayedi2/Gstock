# Étape 1 : Utiliser une image Node.js comme base
FROM node:lts-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package*.json dans le conteneur
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Vérifier si react-scripts est installé
RUN ls -l ./node_modules/.bin

# Donner les permissions d'exécution aux scripts
RUN chmod +x ./node_modules/.bin/react-scripts

# Copier le reste des fichiers
COPY . .

# Construire l'application
RUN npm run build

# Étape 2 : Servir les fichiers statiques avec Nginx
FROM nginx:alpine

# Copier les fichiers build dans le dossier de Nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80
