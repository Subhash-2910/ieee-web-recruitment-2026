# ieee-web-recruitment-2026

#TASK:3

Part-A:Java Script
Corrected Code:-

Method_1(React):-
```JavaScript
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prev) => {
      const next = prev + 1;
      console.log("Count is now: " + next);
      return next;
    });
  };
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log("Iteration: " + i);
    }, 1000);
  }

  return (
    <div>
      <p id="display">{count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}

export default Counter;
```

Issues:
1.Inside for loop changed var to let, Reason :var is function-scoped hence so all setTimeout callbacks log the same value (3).Instead we should use let (block-scoped)
which creates i each time.
2.Used Use state in react to update count and hence removed - document.getElementById('display').innerText=count;

Method 2:
```JavaScript
function Counter() {
  let count = 0;
  
  const handleIncrement = () => {
    count = count + 1; 
    console.log("Count is now: " + count);
    const display = document.getElementById('display');
    if (display) {
      display.innerText = count;
    }
  }
  
  for (let i = 0; i < 3; i++) {  
    setTimeout(() => {
      console.log("Iteration: " + i); 
    }, 1000);
  }
  return handleIncrement; 
}

const Increment=Counter();
```

Issues:-
1.Fixed for loop var -> let
2.Fixed error if the element does not exist. (in line : document.getElementById('display').innerText = count;)


PART-B:Express.js API
```JavaScript
const express = require('express');
const app = express();

app.get('/user/:id', async (req, res) => {
  try {
    const userData = await fetchUserFromDB(req.params.id); 
    if (!userData) {
      return res.status(404).send("User not found");
    }
   res.json({
      status: "success",
      data: userData
    });

  } catch (error) {
    res.status(500).send("Server Error: " + error.message); 
  }
});

async function fetchUserFromDB(id) {
  return { id, name: "IEEE Member" };
}

app.listen(3000, () => console.log("Server running on port 3000"));
```
Issues:-
1.Added await since fetchUserFromDB is async . Reason:Async functions return a Promise, so await is required to get the resolved value.
2.Typo: UserDate -> UserData 
3.Addes async in line - "app.get('/user/:id', async (req, res) => " Reason:to allow use of await.
4.Added return in line - "return res.status(404).send("User not found");" else: Execution continues and tries to send another response causing error
