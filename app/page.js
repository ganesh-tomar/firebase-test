"use client";
import { get, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "./firebaseConfig";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  console.log(users);

  const handleAddData = () => {
    try {
      const usersRef = ref(database, "users");
      const newDataRef = push(usersRef);
      set(newDataRef, {
        title: title,
      });
      setTitle("");
      alert("Data Added Successfully!!");
    } catch (error) {
      console.error("Firebase Error: ", error);
    }
  };

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
        {/* <h1>Fetch Data</h1> */}
        {/* <div>
          {users &&
            users.map((user) => (
              <li key={user.id} className="">
                <p className="text-cosmos">{user.title}</p>
              </li>
            ))}
        </div> */}

        <h1>Add Data</h1>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-4"
          />
          <button
            onClick={handleAddData}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Data
          </button>
        </div>
      </main>
    </div>
  );
}
