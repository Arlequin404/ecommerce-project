db = db.getSiblingDB('admin');

db.createUser({
  user: "root",
  pwd: "example",
  roles: [
    { role: "root", db: "admin" }
  ]
});

db = db.getSiblingDB('ecommerce');

db.createUser({
  user: "root",
  pwd: "example",
  roles: [
    { role: "readWrite", db: "ecommerce" }
  ]
});
