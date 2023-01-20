const names = ['Jimi Hendrix', 'Van Halen', ' Eric Clapton'];

names.sort((a, b) => {
  const lastNameA = a.split(' ')[1];
  const lastNameB = b.split(' ')[1];
  return lastNameA.localeCompare(lastNameB);
});

console.log(names);
