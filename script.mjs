// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.mjs";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };
  try {
    //look in central to tell us what db contains user
    const returnedCentralValue = await central(id);

    //look in specific user database, reccomended by central
    const basicUserData = await dbs[returnedCentralValue](id);

    //look in vault for PRIVATE user data
    const privateUserData = await vault(id);

    let userData = gatherData(id, basicUserData, privateUserData);
    return userData;
  } catch (err) {
    console.error(err);
  }
}

console.log(await getUserData(3));

//Helper Function
function gatherData(id, basicUserData, privateUserData) {
  return {
    id: id,
    name: privateUserData.name,
    username: basicUserData.username,
    email: privateUserData.email,
    address: privateUserData.address,
    phone: privateUserData.phone,
    website: basicUserData.website,
    company: basicUserData.company,
  };
}
//What do we know?
//Central db: tells us what other db to look in for a user
// db1, 2, 3 contain user info
//dbs[valueReturnedFromCentral](id)

// {
//     id: number,
//     name: string,
//     username: string,
//     email: string,
//     address: {
//       street: string,
//       suite: string,
//       city: string,
//       zipcode: string,
//       geo: {
//         lat: string,
//         lng: string
//       }
//     },
//     phone: string,
//     website: string,
//     company: {
//       name: string,
//       catchPhrase: string,
//       bs: string
//     }
// }
