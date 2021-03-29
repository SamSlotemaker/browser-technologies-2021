# Browser technologies

## Description 
Een applicatie om zelf je eigen nerdy t-shirt te ontwerpen en bestellen.

## Wireframes
![wireframes](https://user-images.githubusercontent.com/60625329/111481147-f85ea980-8732-11eb-8567-c5da4f39a23f.jpeg)


### Opbouw van de applicatie
De core functionaliteit van de applicatie moet altijd volledig werkbaar zijn, bijvoorbeeld wanneer JavaScript, of zelfs CSS niet beschikbaar is. Ook kan het zijn dat browsers bepaalde features niet ondersteunen, zoals localStorage, ook dan moet de applicatie werkbaar zijn. 

### Laag 1:
Het ontwerpen van een t-shirt, deze vervolgens op kunnen slaan en bestellen. Ook moeten ontwerpen bewaard kunnen worden voor latere sessies.


### Laag 2: 
De applicatie krijgt styling en wordt bruikbaar. De gebruiker beschikt nog steeds over alle core functionaliteiten en krijgt nu ook een overzichtelijke applicatie die een stuk makkelijker te gebruiken is. 

### Laag 3: 
De applicatie is progressively enhanced doormiddel van JavaScript en een browser API, in dit geval LocalStorage.

#### LocalStorage - userID: 
De applicatie maakt gebruik van localstorage, zodat een gebruiker zijn eigen id niet meer hoeft te onthouden of te bookmarken. LocalStorage slaat dit id op een leest deze uit bij een paginabezoek, hierdoor behoudt de gebruiker zijn ontwerpen zonder extra moeite. Om een userID bij te houden maak ik gebruik van uuidv4.
```uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'```

https://www.npmjs.com/package/uuid
https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

#### LocalStorage - progressie: 
De applicatie maakt tevens gebruik van localStorage om de progressie van het formulier op te slaan. Wanneer een gebruiker een bepaald ontwerp niet volledig afmaakt en opslaat, zal deze progressie bewaard blijven en wordt het formulier aangevuld de eerstvolgende keer dat een ontwerp aangemaakt wordt. Wanneer een ontwerp opgeslagen wordt zal deze storage verwijderd worden en begint een gebruiker weer met een vers ontwerp.
Wanneer JavaScript aan staat maar coockies geblokkeerd worden, is localStorage niet beschikbaar. Op dit moment wordt er een knop getoond waar een gebruiker op kan klikken om zijn userID naar het clipboard te kopiëren. 

https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

#### Progressive Disclosure
Wanneer JavaScript aanstaat wordt het formulier verdeeld in stappen, hierdoor heeft een gebruiker sneller zicht op het t-shirt ontwerp en voelt het minder als het invullen van een simpel formulier.

https://www.w3schools.com/howto/howto_js_form_steps.asp


## Feature detection
In het bouwen van de applicatie is er gebruik gemaakt van feature detectie, om problemen te voorkomen en op te lossen wanneer bepaalde features niet aanwezig/beschikbaar zijn

### Javascript

#### LocalStorage
```js

if (storageAvailable('localStorage')) {
    ...
}
// check if localstrage exist (Rowin)
function storageAvailable(type) {
    try {
        const storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return false;
    }
}
```

#### Clipboard
```js
if ('clipboard' in navigator) {
    ...
}
```

### Css 

#### @supports
Doormiddel van @supports heb ik nieuwere css features een alternatief meegegeven wanneer deze feature niet beschikbaar is. Door cascading wordt de twede waarde hier gepakt wanneer beschikbaar. Wanneer niet beschikbaar wordt de @supports overgeslagen en wordt de eerste waarde gebruikt.
```css 
p {
    font-size: 1.5em;
}

@supports(font-size: clamp(1rem, 10vw, 2rem)) {
    p {
        font-size: clamp(1em, 2.5vw, 2em);
    }
}
```

## Testing

Ik heb mijn applicatie in de volgende browsers getest:

* Chrome (desktop)
* Firefox (desktop)
* Safari (iOS)
* Chrome (android)

En op desktop heb ik op de volgende manieren getest:
Test de applicatie wanneer:
1. alle functies beschikbaar zijn (ideale scenario)
2. enkel Coockies uitstaan (localStorage niet beschikbaar)
3. JavaScript uitstaat (laag 2)
4. CSS uistaat
5. JavaScript en CSS beide uitstaan (laag 1)
