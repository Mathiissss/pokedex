## Fonctionnalités

- **Liste des Pokémon** : Affichage paginé de tous les Pokémons (15 par page)
- **Recherche** : Recherche par nom ou numéro de Pokémon
- **Filtres** : Filtrage par type (Feu, Eau, Plante, etc.)
- **Modal détaillée** : Statistiques, types, capacités et informations complètes
- **Pagination** : Navigation entre les pages avec ellipses intelligentes
- **Responsive** : Interface adaptée mobile et desktop
- **Design moderne** : Interface élégante

## Technologies utilisées

- **React** (avec Hooks)
- **JavaScript ES6+**
- **CSS3** (Grid, Flexbox, animations)
- **PokéAPI** pour les données

## Installation

1. **Cloner le projet**
```bash
git clone https://github.com/Mathiissss/pokedex.git
cd pokedex
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer l'application**
```bash
npm start
```


## Structure du projet

Générer par IA avec un cahier des charges

```
src/
├── components/
│   ├── PokemonList.js      # Liste des cartes Pokémon
│   ├── PokemonCard.js      # Carte individuelle
│   ├── PokemonDetail.js    # Modal de détails
│   ├── SearchBar.js        # Barre de recherche
│   ├── FilterBar.js        # Filtre par type
│   ├── Pagination.js       # Navigation pages
│   └── LoadingSpinner.js   # Indicateur de chargement
├── services/
│   └── pokemonApi.js       # Appels API
├── App.js                  # Composant principal
├── App.css                 # Styles globaux
└── index.js               # Point d'entrée
```

## Problèmes connus

- Certains Pokémons peuvent ne pas avoir d'image
- La recherche est sensible à la casse (utiliser des minuscules)
- Limite de 50 Pokémons par type pour les performances

### Structure des composants
- Composants fonctionnels avec Hooks
- Props pour la communication parent-enfant
- État local avec useState
- Effets avec useEffect
