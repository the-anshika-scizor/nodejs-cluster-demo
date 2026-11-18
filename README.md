# Node.js Cluster Module Demo: Solving the Freeze Problem

Node.js runs JavaScript on a **single thread**, so one heavy request can block the entire server. This project demonstrates that problem and solves it using the built-in **`cluster`** module, with **core Node.js only** (no npm packages, no PM2).

## The Problem

When a CPU-heavy request (like a huge loop) runs on the single thread, every other request has to wait, even a very light one.

- `/heavy` runs a CPU-intensive loop
- `/fast` returns a response instantly

With a single process, if you open `/heavy` and then `/fast`, `/fast` keeps loading until `/heavy` finishes. The whole server is frozen.

## The Solution

Instead of one process, run **multiple copies of the server, one per CPU core**, using the `cluster` module.

- The **primary** process acts as the manager and creates the workers.
- Each **worker** process runs the same HTTP server.
- All workers listen on the **same port**, and requests are distributed among them (load balancing).

Now while one worker is busy with `/heavy`, another worker serves `/fast` instantly.

## Project Structure

```
.
├── 01-Problem.js    # Single process server (shows the freeze problem)
├── 02-Solution.js   # Cluster based server (solves the problem)
└── package.json
```

## Requirements

- Node.js **v18.14 or higher** (needed for `os.availableParallelism()`)
- No `npm install` required, since no external packages are used

## How to Run

### 1. See the problem

```bash
node 01-Problem.js
```

1. Open `http://localhost:4000/heavy` in one tab.
2. Immediately open `http://localhost:4000/fast` in another tab.
3. `/fast` keeps loading until `/heavy` completes. This is the freeze problem.

### 2. See the solution

```bash
node 02-Solution.js
```

1. Open `http://localhost:4000/heavy` in one tab.
2. Immediately open `http://localhost:4000/fast` in another tab.
3. `/fast` responds instantly, even though `/heavy` is still running.

## How the Code Works

| Concept | Purpose |
| --- | --- |
| `cluster.isPrimary` | Checks if the current process is the primary (manager). |
| `os.availableParallelism()` | Returns the number of CPU cores available. |
| `cluster.fork()` | Creates a new worker process. Called once per core. |
| `else` block | Runs inside each worker and starts the HTTP server on port 4000. |

## Cluster Module vs PM2

PM2 is a ready-made process manager that can run your app in cluster mode. Here, the same idea is built by hand with the built-in `cluster` module to understand what happens under the hood.

## Restaurant Analogy

- **1 waiter** (single process): if he is busy with one big order, everyone else waits.
- **Many waiters** (cluster): if one is busy, the others keep serving.
- The **manager** is the primary process, the **waiters** are workers, and distributing customers is **load balancing**.

## Author

**Anshika**
GitHub: [the-anshika-scizor](https://github.com/the-anshika-scizor)
