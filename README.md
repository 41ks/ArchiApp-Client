# ArchiApp-Client

## Fonctions JavaScript

Pour la partie client, après avoir implémenté une interface en HTML et CSS, j’ai ajouté les fonctionnalités suivantes en JavaScript :

- Récupération des messages depuis le serveur avec la fonction `fetchAllMessages()`

Cette fonction utilise fetch pour récupérer les messages depuis le serveur, puis met à jour l’interface avec les messages reçus en appelant la fonction `update(msgs)`.

- Envoi d’un message au serveur avec la fonction `sendMessage(event)`

Cette fonction est appelée lors de la soumission du formulaire d’envoi de message. Elle récupère le contenu du message, utilise fetch pour l’envoyer au serveur, puis met à jour l’interface en appelant `fetchAllMessages()`.

- Mise à jour de l’interface avec les messages récupérés grâce à la fonction `update(msgs)`

Cette fonction prend en paramètre la liste des messages reçus du serveur et les affiche sur l’interface.

- Passage entre le mode clair et le mode sombre avec la fonction `toggleDarkMode()`

Cette fonction est appelée lorsqu’on clique sur le bouton de changement de mode. Elle ajoute ou supprime la classe `dark-mode` sur l’élément `<body>` afin de modifier le thème de l’interface.

## Initialisation

Pour initialiser le site web, j’appelle la fonction `fetchAllMessages()` afin de récupérer et afficher les messages depuis le serveur. J’extrais également les paramètres sauvegardés dans le `localStorage` pour initialiser le thème et le pseudo de l’utilisateur.

## Styles CSS

Pour styliser l’interface, notamment pour implémenter les modes clair et sombre, j’ai utilisé des variables CSS, dont certaines sont modifiées par la classe `dark-mode`. Ainsi, en ajoutant ou en supprimant cette classe sur `<body>`, je peux basculer entre les deux thèmes.

## Sturcture des messages

Les messages envoyés et reçus ont la structure suivante :
```json
{
  "pseudo": "Alice",
  "msg": "Hello, World!",
  "time": "2025-03-14T12:00:00Z"
}
```