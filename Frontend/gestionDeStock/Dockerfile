# Étape 1 : Utiliser Node.js pour construire et servir l'application
FROM node:lts-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application React
RUN npm run build

# Installer un serveur statique léger pour servir les fichiers (comme `serve`)
RUN npm install -g serve

# Définir la commande par défaut pour servir les fichiers
CMD ["serve", "-s", "build", "-l", "80"]

# Exposer le port 80
EXPOSE 80
