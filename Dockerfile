# ── Étape 1 : Build Angular ──────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances en premier (optimise le cache Docker)
COPY package*.json ./
RUN npm ci

# Copier le reste du code source
COPY . .

# Compiler en mode production
RUN npx ng build --configuration production

# ── Étape 2 : Servir avec Nginx ───────────────────────────────────────────────
FROM nginx:1.27-alpine

# Supprimer la config Nginx par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Copier notre config Nginx personnalisée
COPY nginx.docker.conf /etc/nginx/conf.d/default.conf

# Copier le build Angular depuis l'étape précédente
COPY --from=builder /app/dist/cuba-tailwind-angular/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
