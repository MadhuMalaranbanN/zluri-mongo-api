import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGO_URI);
  
  try {
    await client.connect();
    const db = client.db("zluri");
    const collection = db.collection("orgapplications");

    const parentIds = [
      "64d36c2089e6431baea288f3", "67849e71d59dc2244c075472", 
      "67849e71d59dc2244c079758", "60ff25ca35853f4f75d6addd", 
      "67849e71d59dc2244c085637", "67849e71d59dc2244c07a1d9", 
      "60ff1c2035853f4f75d20ecd", "67849e71d59dc2244c075f55", 
      "60ff1d2435853f4f75d29132", "60ff1cb835853f4f75d25ffc",
      "67849e71d59dc2244c077d87", "67849e5ed59dc2244c0727cc",
      "60fea83c35853f4f75b76bdc", "67849e71d59dc2244c079359",
      "67849e71d59dc2244c080de3", "67849e71d59dc2244c07fa0f",
      "67849e71d59dc2244c078308", "67849e71d59dc2244c07e3b4",
      "67849e71d59dc2244c083381", "5fc4ac5ac70ae4043c76d88c",
      "60ff321735853f4f75da74e1", "5fc4ac5fc70ae4043c76f0ce",
      "67849e5ed59dc2244c0721fb", "5fc4ac5ec70ae4043c76e9ab",
      "60ff31d935853f4f75da5762", "5fc4ac60c70ae4043c76f185",
      "67849e71d59dc2244c07e983", "67849e71d59dc2244c0838e0"
    ].map(id => ObjectId(id));

    const results = await collection.find(
      { parentId: { $in: parentIds } },
      { projection: { orgId: 1, createdAt: 1, name: 1, _id: 0 } }
    ).toArray();

    res.status(200).json({ count: results.length, data: results });

  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
}
