import { connect, close } from "./db-connection.js";

const db = await connect();
const questionsCollection = db.collection("questions");
const petsCollection = db.collection("pets");

async function getAllQuestions() {
  try {
    return await questionsCollection.find().toArray();
  } catch (err) {
    console.error("getAllQuestions", err);
  }
}

async function getAnswer(title) {
  try {
    const doc = await questionsCollection.findOne({ title: title });
    return doc ? doc.answer : null;
  } catch (err) {
    console.log("getAnswer", err);
  }
}

async function getPets(kind, sex, age, size) {
  try {
    return await petsCollection
      .find({
        kind: { $regex: kind },
        sex: { $regex: sex },
        age: { $regex: age },
        size: { $regex: size },
      })
      .toArray();
  } catch (err) {
    console.log("getPets", err);
  }
}

export { getAllQuestions, getAnswer, getPets };
