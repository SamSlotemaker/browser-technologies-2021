# Browser technologies

## Description 
Een applicatie om zelf je eigen nerdy t-shirt te ontwerpen en bestellen

### Core functionaliteiten
De core functionaliteit van de applicatie moet altijd volledig werkbaar zijn, bijvoorbeeld wanneer JavaScript, of zelfs CSS niet beschikbaar is. Ook kan het zijn dat browsers bepaalde features niet ondersteunen, zoals localStorage, ook dan moet de applicatie werkbaar zijn. 

#### Laag 1:
Het ontwerpen van een t-shirt, deze vervolgens op kunnen slaan en bestellen. Ook moeten ontwerpen bewaard kunnen worden voor latere sessies.


#### Laag 2: 
De applicatie krijgt styling en wordt bruikbaar. De gebruiker beschikt nog steeds over alle core functionaliteiten en krijgt nu ook een overzichtelijke applicatie die een stuk makkelijker te gebruiken is. 

#### Laag 3: 
De applicatie is progressively enhanced doormiddel van JavaScript en een browser API, in dit geval LocalStorage.

##### LocalStorage - userID: 
De applicatie maakt gebruik van localstorage, zodat een gebruiker zijn eigen id niet meer hoeft te onthouden of te bookmarken. LocalStorage slaat dit id op een leest deze uit bij een paginabezoek, hierdoor behoudt de gebruiker zijn ontwerpen zonder extra moeite
##### LocalStorage - progressie: 
De applicatie maakt tevens gebruik van localStorage om de progressie van het formulier op te slaan. Wanneer een gebruiker een bepaald ontwerp niet volledig afmaakt en opslaat, zal deze progressie bewaard blijven en wordt het formulier aangevuld de eerstvolgende keer dat een ontwerp aangemaakt wordt. Wanneer een ontwerp opgeslagen wordt zal deze storage verwijderd worden en begint een gebruiker weer met een vers ontwerp.
Wanneer JavaScript aan staat maar coockies geblokkeerd worden, is localStorage niet beschikbaar. Op dit moment wordt er een knop getoond waar een gebruiker op kan klikken om zijn userID naar het clipboard te kopiëren. 

##### Progressive Disclosure
Wanneer JavaScript aanstaat wordt het formulier verdeeld in stappen, hierdoor heeft een gebruiker sneller zicht op het t-shirt ontwerp en voelt het minder als het invullen van een simpel formulier.

## Wireframes
![wireframes](https://user-images.githubusercontent.com/60625329/111481147-f85ea980-8732-11eb-8567-c5da4f39a23f.jpeg)
