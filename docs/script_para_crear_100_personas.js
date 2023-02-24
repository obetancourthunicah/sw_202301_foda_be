var docs = [];
for (var i = 0 ; i<100 ; i++){
  var doc = {
    nombre: 'Usuario ' + (i + 1),
    antiguedad: 0,
    edad: Math.ceil(Math.random() * 100),
    likes: 0,
    tag: ['tag1', 'tag2', 'tag3'][Math.floor(Math.random() * 3)],
    fecha: new Date().getTime() + Math.floor(Math.random() * 100 * (1000 * 60 * 60 * 24)),
    activo: Math.random() > 0.5
  }
  docs.push(doc);
}
db.personas.insertMany(docs);
