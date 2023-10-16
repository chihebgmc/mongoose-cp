const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') });

// console.log(process.env.MONGO_URI);

// Connect to data base
mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err.message));

// Schema
const personSchema = new mongoose.Schema({
  name: { type: String, require: true },
  age: Number,
  favouriteFoods: [String],
});

// Model
const Person = mongoose.model('Person', personSchema);

// Create and Save a Record of a Model:
async function addPerson(onePerson) {
  try {
    const person = new Person(onePerson);
    const result = await person.save();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
}

// Create Many Records with model.create()
async function addManyPeaople(people) {
  try {
    const result = await Person.create(people);
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
}

// Use model.find() to Search Your Database
async function findPeople(name) {
  try {
    const people = await Person.find({ name });
    console.log(people);
  } catch (err) {
    console.error(err.message);
  }
}

// Use model.findOne() to Return a Single Matching Document from Your Database
async function findOnePerson(food) {
  try {
    const person = await Person.findOne({ favouriteFoods: food });
    console.log(person);
  } catch (err) {
    console.error(err.message);
  }
}

// Use model.findById() to Search Your Database By _id
async function findPersonById(id) {
  try {
    const person = await Person.findById(id);
    console.log(person);
  } catch (err) {
    console.error(err.message);
  }
}

// Perform Classic Updates by Running Find, Edit, then Save
async function updatePerson(id) {
  try {
    // Find
    const person = await Person.findById(id);

    if (!person) throw new Error('Not found');

    // Edit
    person.favouriteFoods.push('Hamburger');

    // Save
    const result = await person.save();
  } catch (err) {
    console.error(err.message);
  }
}

// Perform New Updates on a Document Using model.findOneAndUpdate()
async function updateOnePerson(personName, newAge) {
  try {
    const person = await Person.findOneAndUpdate(
      { name: personName },
      { age: newAge },
      { new: true }
    );
    console.log(person);
  } catch (err) {
    console.error(err.message);
  }
}

async function removePersonById(id) {
  try {
    const person = await Person.findByIdAndRemove({ _id: id });
    console.log(person);
  } catch (err) {
    console.error(err.message);
  }
}

// MongoDB and Mongoose - Delete Many Documents with model.remove()
async function removePeople(name) {
  try {
    const result = await Person.deleteMany({ name });
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
}

// Chain Search Query Helpers to Narrow Search Results
async function search(food) {
  try {
    const result = await Person.find({ favouriteFoods: food })
      .sort('name')
      .limit(2)
      .select('-age');
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
}

search('burritos');
// removePeople('Mary');
// removePersonById('65296b0fc6c3f919e7b8470e');
// updateOnePerson('Sam', 20);
// updatePerson('65296b0fc6c3f919e7b8470f');
// findPersonById('65296b0fc6c3f919e7b8470e');
// findOnePerson('Soup');
// findPeople('John');

// addPerson({
//   name: 'Mary',
//   age: 45,
//   favouriteFoods: ['Hamburger', 'Soup', 'burritos'],
// });

// addManyPeaople([
//   {
//     name: 'John',
//     age: 45,
//     favouriteFoods: ['Hamburger', 'Soup', 'burritos'],
//   },
//   {
//     name: 'Jane',
//     age: 20,
//     favouriteFoods: ['Salad', 'burritos'],
//   },
//   {
//     name: 'Sam',
//     age: 15,
//     favouriteFoods: ['Pizza', 'Pasta'],
//   },
// ]);
