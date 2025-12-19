function knightMoves(start, end) {
  // All 8 possible knight moves (L-shaped: 2 in one direction, 1 in another)
  const moves = [
    [2, 1],   // right 2, down 1
    [2, -1],  // right 2, up 1
    [-2, 1],  // left 2, down 1
    [-2, -1], // left 2, up 1
    [1, 2],   // right 1, down 2
    [1, -2],  // right 1, up 2
    [-1, 2],  // left 1, down 2
    [-1, -2]  // left 1, up 2
  ];

  // Check if a position is within the 8x8 board
  function isValidPosition(x, y) {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
  }

  // Check if we've reached the end position
  function positionEquals(pos1, pos2) {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
  }

  // BFS to find shortest path
  function bfs(start, end) {
    // Queue stores [position, path]
    const queue = [[start, [start]]];
    const visited = new Set();
    visited.add(JSON.stringify(start));

    while (queue.length > 0) {
      const [currentPos, path] = queue.shift();

      // Check if we've reached the end
      if (positionEquals(currentPos, end)) {
        return path;
      }

      // Try all 8 possible knight moves
      for (const [dx, dy] of moves) {
        const newX = currentPos[0] + dx;
        const newY = currentPos[1] + dy;

        // Check if the new position is valid and not visited
        if (isValidPosition(newX, newY)) {
          const newPos = [newX, newY];
          const posKey = JSON.stringify(newPos);

          if (!visited.has(posKey)) {
            visited.add(posKey);
            queue.push([newPos, [...path, newPos]]);
          }
        }
      }
    }

    // No path found (shouldn't happen on an 8x8 board)
    return null;
  }

  // Find the shortest path
  const path = bfs(start, end);

  // Format and display the result
  if (path) {
    const moveCount = path.length - 1;
    console.log(`You made it in ${moveCount} moves!  Here's your path:`);
    path.forEach(pos => {
      console.log(`  [${pos[0]},${pos[1]}]`);
    });
    return path;
  } else {
    console.log("No path found!");
    return null;
  }
}

// Test cases
console.log("Test 1: [0,0] to [1,2]");
knightMoves([0, 0], [1, 2]);
console.log("\n---\n");

console.log("Test 2: [0,0] to [3,3]");
knightMoves([0, 0], [3, 3]);
console.log("\n---\n");

console.log("Test 3: [3,3] to [4,3]");
knightMoves([3, 3], [4, 3]);
console.log("\n---\n");

console.log("Test 4: [0,0] to [7,7]");
knightMoves([0, 0], [7, 7]);
