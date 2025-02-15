"use client";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "./firebaseConfig";

export default function Home() {
  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    const useRef = ref(database, "users");
    get(useRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usersArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );
          setUsers(usersArray);
        } else {
          console.log("No data");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="conatiner mx-auto max-w-[1600px]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Fetch Data</h1>
        <div>
          {users &&
            users.map((user) => (
              <li key={user.id} className="">
                <p className="text-cosmos">{user.title}</p>
              </li>
            ))}
        </div>
      </main>
    </div>
  );
}
