# My Car Garage

Aplikacja w React do zarządzania listą aut: dodawanie, edycja, usuwanie, szukanie po marce/modelu, filtr po paliwie, sortowanie po marce lub roku (rosnąco/malejąco) i strony po 5 aut.

Dane są trzymane tylko w stanie aplikacji (useState). Po odświeżeniu strony wraca początkowe 12 aut.

## Uruchomienie

npm install
npm run dev

## Pliki

- App.jsx – cały stan i logika (szukanie, filtr, sortowanie, strony, dodawanie, edycja, usuwanie)
- App.css – style
- data/carData.jsx – 12 aut na start
- component/carEditor.jsx – ten sam formularz do dodawania i edycji, z walidacją
- component/PopUpBox.jsx – wyskakujące okienko (używane do formularza i do potwierdzenia usunięcia)
- component/pageSwitcher.jsx – przyciski stron
- component/CarCard.jsx – jedno auto na liście
- component/Button.jsx – przycisk używany w wielu miejscach
