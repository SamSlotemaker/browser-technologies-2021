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


### Chrome desktop
![Shirt ontwerp - Google Chrome 2021-03-29 19-14-36](https://user-images.githubusercontent.com/60625329/112876370-ba17a180-90c5-11eb-88b3-163f4fde09c8.gif)


### Firefox desktop
![Shirt ontwerp - Google Chrome 2021-03-29 19-14-36](https://user-images.githubusercontent.com/60625329/112876734-272b3700-90c6-11eb-904b-72961883ae59.gif)

### Chrome android 
![ezgif com-gif-maker](https://user-images.githubusercontent.com/60625329/112875802-f1398300-90c4-11eb-8306-98868469d531.gif)

### Safari iOS 
![Video](https://user-images.githubusercontent.com/60625329/112877125-ab7dba00-90c6-11eb-8fba-daf5fdcc146c.gif)


#### Javascript uitgeschakeld
Wanneer javascirpt is uitgeschakeld is localstorage niet beschikbaar om de gebruiker door te sturen dus het ID zal zelf bewaard moeten worden.

![Schermopname (144)](https://user-images.githubusercontent.com/60625329/112879899-1086df00-90ca-11eb-9116-45b8b8855f8b.png)

Ook wordt er geen live preview meer getoond en is het form simpelweg een standaard formulier, zonder progressive disclosure. 

![Schermopname (145)](https://user-images.githubusercontent.com/60625329/112879901-111f7580-90ca-11eb-99f6-983cd667e1bb.png)

#### Cookies uitgeschakeld

Wanneer cookies/localstorage niet beschikbaar zijn, wordt er een mogelijkheid getoond om het ID naar het clipboard te kopieren, om het de gebruiker toch net iets makkelijker te maken.
![Schermopname (146)](https://user-images.githubusercontent.com/60625329/112879902-111f7580-90ca-11eb-93b5-8ee8bc6dfe4a.png)

Het enhanced formulier kan verder wel volledig gebruikt worden.
![Schermopname (148)](https://user-images.githubusercontent.com/60625329/112879904-111f7580-90ca-11eb-9044-863943d8ecec.png)

### Styles uitgeschakeld
Zonder styles zijn de pagina's een stuk minder overzichtelijk, maar is de core nog steeds volledig bruikbaar.

![Schermopname (149)](https://user-images.githubusercontent.com/60625329/112879905-11b80c00-90ca-11eb-8aa7-0ace43fa4d1c.png)

![Schermopname (150)](https://user-images.githubusercontent.com/60625329/112879896-0fee4880-90ca-11eb-9b38-f4e7dbbc5093.png)





