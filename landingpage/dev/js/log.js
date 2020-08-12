const container = document.querySelector('.js-names-container');

let names = [
  'Thomas Kemper',
  'Ute Wegmann',
  'Andreas Tritsch',
  'Gerlis Zillgens',
  'Tobias Schulenburg',
  'Nadjana Mohr',
  'Anke von Claer-Schaar',
  'Johannes Specks',
  'Maurits Boettger',
  'Andreas Keil',
  'Sebastian Osterhaus',
  'Beate Gördes',
  'Kriz Olbricht',
  'Brigitte Dunkel',
  'Dagmar Hugk',
  'Dorian Steinhoff',
  'Tobias Schulenburg',
];

names = names.sort(() => Math.random() - 0.5); // shuffle names
names = `◰◱◳ Mit ${names.join(' - ')} ◰◱◳`; // join them
container.innerHTML = names; // paste to assembly line bar

$('.marquee').marquee({
  duration: 15000,
  gap: 10,
  delayBeforeStart: 0,
  direction: 'left',
  duplicated: true,
});
