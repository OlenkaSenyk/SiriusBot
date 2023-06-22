import { connect, close } from "./db-connection.js";

const db = await connect();
const questionsCollection = db.collection("questions");

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

export { getAllQuestions, getAnswer };
